import fs from 'fs';
import type { CreateNodeArgs, GatsbyNode } from 'gatsby';
import { parse as parseExif } from 'exifr';
import exiftool from 'exiftool';

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
          exiftool.metadata(data, ['-creationDate', '-gpsLatitude', '-gpsLongitude', '-coordFormat', '%.4f'], (err, { creationDate, gpsLatitude, gpsLongitude }) => {
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
                const latitude = parseFloat(gpsLatitude) * (gpsLatitude.endsWith('N') ? 1 : -1);
                const longitude = parseFloat(gpsLongitude) * (gpsLongitude.endsWith('E') ? 1 : -1);
                createNodeField({
                  node,
                  name: 'coordinates',
                  value: {
                    latitude,
                    longitude,
                  }
                });
              } else {
                console.debug('no GPS data for', node.relativePath);
              }
            }
          });
        }
      });
    } else {
      const exif = await parseExif(node.absolutePath, {
        reviveValues: false,
        pick: ['DateTimeOriginal', 'OffsetTimeOriginal', 'GPSLatitude', 'GPSLatitudeRef', 'GPSLongitudeRef', 'GPSLongitude'],
      }).catch((e) => { console.error('Failed to read', node.relativePath) });

      if (exif?.DateTimeOriginal) {
        let offsetTimeOriginal: string;
        if (exif.OffsetTimeOriginal) {
          offsetTimeOriginal = exif.OffsetTimeOriginal;
        } else {
          const localOffset = defaultClientOffset();
          console.warn('no timezone specified for', node.relativePath, ', using local offset of', localOffset, 'instead');
          offsetTimeOriginal = localOffset;
        }
        const value = parseExifDate(exif.DateTimeOriginal + offsetTimeOriginal);
        createNodeField({
          node,
          name: 'createDate',
          value,
        });
      } else {
        console.debug('no creation date data for', node.relativePath);
      }
      if (exif?.latitude && exif?.longitude) {
        createNodeField({
          node,
          name: 'coordinates',
          value: {
            latitude: exif.latitude,
            longitude: exif.longitude,
          },
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

function defaultClientOffset() {
  return Intl.DateTimeFormat('en', { timeZoneName: 'longOffset' })
    .formatToParts(new Date())
    .find(part => part.type === 'timeZoneName')!.value
    .replace('GMT', '');
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
