import babelJest from "babel-jest"

const babelOptions = {
  presets: ["babel-preset-gatsby", "@babel/preset-typescript"],
}
 
// module.exports = require("babel-jest").default.createTransformer(babelOptions)
// process.exit(1)
export default babelJest.createTransformer(babelOptions)
