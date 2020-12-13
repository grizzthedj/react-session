const gulp = require('gulp');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const demoConfig = require('./webpack.config.demo.js');
const babel = require('gulp-babel');
const shell = require('gulp-shell');
const del = require('del');

gulp.task('clean-build', function() {
  return del(['./dist/*.js']);
});

gulp.task('clean-demo', function() {
  return del(['./demo/public/*.js']);
});

gulp.task('build-component', gulp.series('clean-build', async function() {
  gulp.src(['./src/**/*.js', './src/*js'])
    .pipe(babel())
    .pipe(gulp.dest('./dist'));
}));

gulp.task('build', gulp.series(['clean-build', 'clean-demo'], shell.task([
  'gulp build-component',
  'webpack --config webpack.config.build-demo.js'
])));

gulp.task('demo', function() {
  new WebpackDevServer(webpack(demoConfig), {
    publicPath: "/",
    contentBase: "demo/",
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    stats: {
      assets: true,
      colors: true,
      version: false,
      hash: false,
      timings: true,
      chunks: true,
      chunkModules: false
    },
    historyApiFallback: true
  }).listen(8080, 'localhost', function(err, result) {
    if (err) {
      console.log(err);
    }
    console.log('Listening at localhost:8080');
  });
});
