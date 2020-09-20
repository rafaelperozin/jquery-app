import gulp from 'gulp';
import sass from 'gulp-sass';
import plumber from 'gulp-plumber';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps'
import browserify from 'browserify';
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import del from 'del';

const paths = {
    styles: {
        src: 'src/styles/**/*.scss',
        cssFolder: 'src/styles/',
        cssFiles: [
            'main.scss',
            'main_product.scss',
            'main_category.scss'
        ],
        destRoot: './css',
        dest: './css/pages'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        jsFiles: [
            'main.js',
            'product.js',
            'tabs.js'
        ],
        jsFolder: 'src/scripts/',
        dest: './js/custom'
  }
};

/*
 * Delete all files
 */
export const clean = () => del(
    [
        paths.scripts.dest + '/*',
        paths.styles.dest + '/*',
        paths.styles.destRoot + '/xigen-main.min.css',
        paths.styles.destRoot + '/xigen-main.min.css.map'
    ]);

/*
 * Style compile
 */
export function styles(done) {
    paths.styles.cssFiles.map(function (entry) {
        const destiny = (entry == 'main.scss') ? paths.styles.destRoot : paths.styles.dest;
        const newName = (entry == 'main.scss') ? 'xigen-'+entry.split('.scss')[0] : 'xigen-'+entry.split('.scss')[0].split('_')[1];
        return gulp.src(paths.styles.cssFolder + entry, { allowEmpty: true })
            .pipe(sourcemaps.init())
            .pipe(plumber())
            .pipe(sass({ includePaths: ['./node_modules/'] }))
            .pipe(autoprefixer({ grid: 'autoplace' }))
            .pipe(cleanCSS())
            .pipe(rename({
                basename: newName,
                suffix: '.min'
            }))
            .pipe(sourcemaps.write("./"))
            .pipe(gulp.dest(destiny));
    });
    done();
}

/*
 * Script compile
 */
export function scripts(done) {
    paths.scripts.jsFiles.map(function (entry) {
        const newName = 'xigen-'+entry.split('.js')[0];
        return browserify({
          entries: [paths.scripts.jsFolder + entry]
        })
        .transform("babelify", { presets: ["@babel/preset-env"] })
        .bundle()
        .pipe(source(entry))
        .pipe(rename({
            basename: newName,
            suffix: '.min',
            extname: '.js'
        }))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.scripts.dest))
    });
    done();
}

 /*
  * Watch changes on files
  */
function watchFiles() {
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.styles.src, styles);
}
export { watchFiles as watch };

const build = gulp.series(clean, gulp.parallel(styles, scripts));

gulp.task('watch', watchFiles);
gulp.task('build', build);