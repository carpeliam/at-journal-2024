import fs from 'fs';
import { read as readExif } from 'fast-exif';
import exiftool from 'exiftool';
import type { CreateNodeArgs, GatsbyNode } from 'gatsby';

type SiteNode = Record<string, unknown> & {
  frontmatter: {
    title: string;
  }
  absolutePath: string;
  extension: string;
}

export const onCreateNode: GatsbyNode["onCreateNode"] = async ({ node, actions }: CreateNodeArgs<SiteNode>) => {
  const { createNodeField } = actions
  if (node.internal.type === 'File' && node.sourceInstanceName === 'images') {
    if (node.extension === 'mp4') {
      fs.readFile(node.absolutePath, function (err, data) {
        if (err)
          console.error(err);
        else {
          exiftool.metadata(data, ['-gpsLatitude', '-gpsLongitude', '-creationDate'], (err, { gpsLatitude, gpsLongitude, creationDate }) => {
            if (err)
              console.error(err);
            else {
              if (creationDate) {
                createNodeField({
                  node,
                  name: 'createDate',
                  value: parseExifDate(creationDate),
                });
              }
              if (gpsLatitude && gpsLongitude) {
                createNodeField({
                  node,
                  name: 'coordinates',
                  value: {
                    latitude: degreesMinutesSecondsStringToLatLng(gpsLatitude),
                    longitude: degreesMinutesSecondsStringToLatLng(gpsLongitude),
                  }
                });
              } else {
                console.debug('no GPS data for', node.relativePath, creationDate);
              }
            }
          });
        }
      });
    } else {
      const exif = await readExif(node.absolutePath).catch((e) => { console.error('Failed to read', node.relativePath) });
      
      if (exif?.exif?.DateTimeOriginal) {
        const dateTimeOriginal = exif.exif.DateTimeOriginal as Date;
        const dateTimeOriginalOffset = exif.exif['36881'] as string | undefined;
        const value = (dateTimeOriginalOffset) ? new Date(dateTimeOriginal.toISOString().replace('Z', dateTimeOriginalOffset)) : dateTimeOriginal;
        createNodeField({
          node,
          name: 'createDate',
          value,
        });
      }
      if (exif?.gps) {
        createNodeField({
          node,
          name: 'coordinates',
          value: {
            latitude: decimalLatitudeFor(exif.gps),
            longitude: decimalLongitudeFor(exif.gps),
          }
        });
      } else {
        console.debug('no GPS data for', node.relativePath);
      }
    }
  }
}

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ stage, loaders, actions }) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-leaflet-cluster/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
}

function degreesMinutesSecondsStringToLatLng(dms: string): number | undefined {
  const [_whole, degrees, minutes, seconds, direction] = dms.match(/(\d+) deg (\d+)' (\d+.?\d+)" ([NSEW])/)!;
  const degreesMinutesSeconds = [degrees, minutes, seconds].map(parseFloat);
  if (['N', 'S'].includes(direction)) {
    return decimalLatitudeFor({ GPSLatitudeRef: direction, GPSLatitude: degreesMinutesSeconds });
  } else if (['E', 'W'].includes(direction)) {
    return decimalLongitudeFor({ GPSLongitudeRef: direction, GPSLongitude: degreesMinutesSeconds });
  }
  console.debug('no coordinates determined for', dms);
}

function degreesMinutesSecondsToDecimal([degrees, minutes, seconds]: number[]) {
  return degrees + (minutes / 60) + (seconds / 3600);
}

function decimalLatitudeFor(gps: Record<string, unknown>) {
  if (gps?.GPSLatitude) {
    const decimal = degreesMinutesSecondsToDecimal(gps.GPSLatitude as number[]);
    return (gps.GPSLatitudeRef === 'N') ? decimal : -decimal;
  } else {
    console.debug('no latitude for', gps);
  }
}

function decimalLongitudeFor(gps: Record<string, unknown>) {
  if (gps?.GPSLongitude) {
    const decimal = degreesMinutesSecondsToDecimal(gps.GPSLongitude as number[]);
    return (gps.GPSLongitudeRef === 'E') ? decimal : -decimal;
  } else {
    console.log('no longitude for', gps);
  }
}

// currently unable to use exif-date library until https://github.com/blakeembrey/exif-date/pull/18 is addressed
const EXIF_DATE_REGEXP = new RegExp(
  "^(\\d{4}):(\\d{2}):(\\d{2}) (\\d{2}):(\\d{2}):(\\d{2})" +
    "(?:\\.(\\d{1,3}))?(?:([zZ])|([-+])(\\d{2}):(\\d{2}))?$"
);
function parseExifDate(value: string): Date {
  const m = EXIF_DATE_REGEXP.exec(value);

  if (m == null) {
    return new Date(NaN);
  }

  const date = new Date();
  const offset = m[8]
    ? 0
    : m[9]
    ? (Number(m[10]) * 60 + Number(m[11])) * (m[9] === "+" ? -1 : 1)
    : 0;

  date.setUTCFullYear(Number(m[1]));
  date.setUTCMonth(Number(m[2]) - 1);
  date.setUTCDate(Number(m[3]));
  date.setUTCHours(Number(m[4]));
  date.setUTCMinutes(Number(m[5]) + offset);
  date.setUTCSeconds(Number(m[6]));
  date.setUTCMilliseconds(Number(m[7]) || 0);

  return date;
}
