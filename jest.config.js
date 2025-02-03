module.exports = {
    transform: {
      "^.+\\.[jt]sx?$": "<rootDir>/jest-preprocess.ts",
    },
    moduleNameMapper: {
      ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
      ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
    },
    testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
    transformIgnorePatterns: [`node_modules/(?!(gatsby|gatsby-script|gatsby-link|@react-leaflet|react-leaflet)/)`],
    globals: {
      __PATH_PREFIX__: ``,
      fetch: global.fetch,
      Request: global.Request,
      Response: global.Response,   
      TextEncoder: global.TextEncoder, 
      TransformStream: global.TransformStream,
      BroadcastChannel: global.BroadcastChannel,
    },
    testEnvironmentOptions: {
      url: `http://localhost`,
      customExportConditions: [''],
    },
    setupFiles: [`<rootDir>/loadershim.js`],
    testEnvironment: `jsdom`,
    setupFilesAfterEnv: ["<rootDir>/setup-test-env.ts"],
  }
  