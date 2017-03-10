const path = require('path');
const express = require('express');
const webpack = require('webpack');
const proxyMiddleware = require('proxy-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const colors = require('colors/safe');
const dateformat = require('dateformat');

const webpackDevConfig = require('./webpack.dev.config');


const server = express();

const port = 4001;
const serverUrl = `http://localhost:${port}`;
const publicPath = '/bundle';
const webpackUrl = `${serverUrl}${publicPath}/`;


function logInfo(message) {
  const INFO = colors.cyan('INFO');
  const date = colors.grey.bold(dateformat('HH:MM:ss'));
  console.log(`[${INFO}] ${date} ${message}`);
}

function logError(message) {
  const ERROR = colors.red('ERROR');
  const date = colors.grey.bold(dateformat('HH:MM:ss'));
  console.log(`[${ERROR}] ${date} ${message}`);
}


// Only add webpack dev middleware if --with-webpack
// option is specified.
logInfo('Use webpack to serve assets');
const compiler = webpack(webpackDevConfig);
server.use(webpackDevMiddleware(compiler, {
  publicPath,
  stats: { colors: true },
  reporter: (info) => {
    if (info.state && info.stats.compilation.errors.length > 0) {
      info.stats.compilation.errors.forEach((e) => logError(e.message));
    }
    else {
      logInfo('Webpack compilation finished');
      logInfo(`Assets served from ${webpackUrl}`);
    }
  },
}));
server.use(webpackHotMiddleware(compiler, {
  log: logInfo,
}));


// Add main route to serve index.html
server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


// Start the server
server.listen(port, () => {
  logInfo(`Server listening on ${serverUrl}`);
});
