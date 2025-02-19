import slugify from '@sindresorhus/slugify';
import { read as readExif } from 'fast-exif';

export const onCreateNode = async ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx` || node.internal.type === 'MarkdownRemark') {
    createNodeField({
      node,
      name: `slug`,
      value: slugify(node.frontmatter.title)
    })
  } else {
    if (node.internal.type === 'File' && node.sourceInstanceName === 'images') {
      const exif = await readExif(node.absolutePath).catch((e) => { console.error('Failed to read', node.relativePath) });
      if (exif?.gps) {
        createNodeField({
          node,
          name: 'coordinates',
          value: {
            latitude: decimalLatitudeFor(exif.gps),
            longitude: decimalLongitudeFor(exif.gps),
          }
        });
      }
      // if (exif?.exif?.DateTimeOriginal) {
      //   createNodeField({
      //     node,
      //     name: 'dateTimeOriginal',
      //     value: exif.exif.DateTimeOriginal,
      //   });
      // }
    }
  }
}

function degreesMinutesSecondsToDecimal([degrees, minutes, seconds]: number[]) {
  return degrees + (minutes / 60) + (seconds / 3600);
}

function decimalLatitudeFor(gps) {
  if (gps?.GPSLatitude) {
    const decimal = degreesMinutesSecondsToDecimal(gps.GPSLatitude);
    return (gps.GPSLatitudeRef === 'N') ? decimal : -decimal;
  } else {
    console.debug('no latitude for', gps);
  }
}

function decimalLongitudeFor(gps) {
  if (gps?.GPSLongitude) {
    const decimal = degreesMinutesSecondsToDecimal(gps.GPSLongitude);
    return (gps.GPSLongitudeRef === 'E') ? decimal : -decimal;
  } else {
    console.log('no longitude for', gps);
  }
}
