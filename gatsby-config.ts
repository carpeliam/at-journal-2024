import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `AT 2024 Day by Day`,
    siteUrl: `https://www.yourdomain.tld`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-postcss", "gatsby-plugin-image", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  }, "gatsby-plugin-mdx", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "geojson",
      "path": "./src/geojson/"
    },
    __key: "geojson"
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "entries",
      "path": "./src/entries/"
    },
    __key: "entries"
  },
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      // gfm: true,
      // footnotes: true,
      // blocks: ["h2"], Blocks option value can be provided here as an array.
      // excerpt_separator: `<!-- end -->`,
      plugins: [
        // {
        //   resolve: `gatsby-remark-images`,
        //   options: {
        //     maxWidth: 740,
        //   },
        // },
        // {
        //   resolve: `gatsby-remark-responsive-iframe`,
        //   options: {
        //     wrapperStyle: `margin-bottom: 1.0725rem`,
        //   },
        // },
        // `gatsby-remark-copy-linked-files`,
        // {
        //   resolve: `gatsby-remark-smartypants`,
        //   options: {
        //     dashes: `oldschool`,
        //   },
        // },
        // {
        //   resolve: `gatsby-remark-embed-snippet`,
        //   options: {
        //     // Example code links are relative to this dir.
        //     directory: `${__dirname}/src/code-examples/`,
        //   },
        // },
        // `gatsby-remark-autolink-headers`,
        // `gatsby-remark-graphviz`, // graphviz before prismjs
        // `gatsby-remark-prismjs`,
        // `gatsby-remark-katex`,
      ],
    },
  },
  'gatsby-plugin-react-leaflet'
]
};

export default config;
