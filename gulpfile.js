const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');

const sassFiles = './src/sass/style.scss';
const jsFiles = [
    './src/js/animate-scripts.js',
    './node_modules/bootstrap/dist/js/bootstrap.js',
    './src/js/popper.min.js',
    './src/js/jquery.waypoints.min.js',
    './src/js/smooth-scroll.min.js',
    './src/js/custom-scripts.js'
];

function css(cb) {
    src(sassFiles)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer, cssnano]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('.'));
    cb();
}

function js(cb) {
    src(jsFiles)
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('.'));
    cb();
}

exports.default = function () {
    watch(sassFiles, series(css));
};

exports.watch = function () {
    watch([sassFiles, './src/js/*.js'], series(css, js));
};