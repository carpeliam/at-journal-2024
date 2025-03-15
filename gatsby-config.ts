import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Marathon From Georgia To Maine',
    description: 'Between April 3rd and August 13th of 2024, I hiked 2197 miles from Georgia to Maine. This is the story of the steps.',
    siteUrl: 'https://www.yourdomain.tld'
  },
  pathPrefix: '/at-journal-2024',
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ['gatsby-plugin-postcss', 'gatsby-plugin-image', 'gatsby-plugin-sitemap', {
    resolve: 'gatsby-plugin-manifest',
    options: {
      icon: 'src/images/icon.png'
    }
  }, 'gatsby-plugin-mdx', 'gatsby-plugin-sharp', 'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/'
      },
      __key: 'images'
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/'
      },
      __key: 'pages'
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: './src/content/',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'geojson',
        path: './src/geojson/'
      },
      __key: 'geojson'
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'entries',
        path: './src/entries/'
      },
      __key: 'entries'
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        // gfm: true,
        // footnotes: true,
        // blocks: ['h2'], Blocks option value can be provided here as an array.
        // excerpt_separator: '<!-- end -->',
        plugins: [
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              rel: 'noopener noreferrer',
            },
          },
          // {
          //   resolve: 'gatsby-remark-images',
          //   options: {
          //     maxWidth: 740,
          //   },
          // },
          // 'gatsby-remark-autolink-headers',
        ],
      },
    },
    'gatsby-plugin-react-leaflet'
  ]
};

export default config;
