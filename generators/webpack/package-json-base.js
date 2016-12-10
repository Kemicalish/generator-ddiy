module.exports = {
  'devDependencies': {
    "babel-loader": "^6.2.8",
    "css-loader": "^0.26.1",
    "image-webpack-loader": "^3.0.0",
    "node-sass": "^3.13.0",
    "sass-loader": "^4.0.2",
    "style-loader": "^0.13.1",
    "webpack-dev-server": "^1.16.2",
    "webpack": "^1.14.0",
    "copy-webpack-plugin": "^4.0.1",
  },
  'dependencies': {

  },
  scripts:{
    "build": "webpack -d --env=development",
    "build:staging": "webpack --env=staging",
    "build:prod": "webpack -p --env=production",
    "serve": "webpack-dev-server -d --content-base dev/ --env=development",
    "serve:staging": "webpack-dev-server --content-base staging/ --env=staging",
    "serve:prod": "webpack-dev-server -p --content-base prod/ --env=production"
  }
}