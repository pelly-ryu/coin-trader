import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import rimraf from 'rimraf';

const plugins = loadPlugins();

import popupWebpackConfig from './popup/webpack.config';

gulp.task('popup-js', ['clean'], (cb) => {
    webpack(popupWebpackConfig, (err, stats) => {
        if (err) throw new plugins.util.PluginError('webpack', err);

        plugins.util.log('[webpack]', stats.toString());

        cb();
    });
});

gulp.task('popup-html', ['clean'], () => {
    return gulp.src('popup/src/index.html')
        .pipe(plugins.rename('popup.html'))
        .pipe(gulp.dest('./build'))
});

gulp.task('copy-manifest', ['clean'], () => {
    return gulp.src('manifest.json')
        .pipe(gulp.dest('./build'));
});

gulp.task('copy-images', ['clean'], () => {
    return gulp.src('images/*.*')
        .pipe(gulp.dest('./build/images'));
});

gulp.task('clean', (cb) => {
    rimraf('./build', cb);
});

gulp.task('build', ['copy-manifest', 'copy-images', 'popup-js', 'popup-html']);

gulp.task('watch', ['default'], () => {
    gulp.watch('popup/**/*', ['build']);
});

gulp.task('default', ['build']);
