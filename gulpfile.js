const connect = require('gulp-connect');
const { series, watch, src, dest, parallel } = require('gulp');
const postcss = require('gulp-postcss');

const cacheControl = (_req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
}

const devServer = (cb) => {
  connect.server({
    root: 'public',
    middleware: (_connect, _opt) => [cacheControl]
  }, cb);
}

const cssPipeline = () => {
  return src('src/css/*.css').pipe(postcss());
}

const devOutput = () => {
  return cssPipeline().pipe(dest('public/css/'));
}

const devWatch = (cb) => {
  watch('src/css/*.css', devOutput);
  cb();
}

exports.develop = parallel(devServer, devWatch)