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
      const exif = await readExif(node.absolutePath);
      if (exif?.gps) {
        createNodeField({
          node,
          name: 'liamgps',
          value: {
            latitude: exif.gps.GPSLatitude,
            longitude: exif.gps.GPSLongitude
          }
        })
      }
    }
  }
}
