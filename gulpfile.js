const appRoot = require('app-root-path');
const { path, build, conf, site, page } = require(appRoot + '/modules/core/settings.js');

const {src, dest, series, parallel}  = require('gulp')
const log = require('fancy-log');
const rename       = require('gulp-rename');
const print = require('gulp-print').default;
const changed      = require('gulp-changed');
const sitemap      = require('gulp-sitemap')
const favicon      = require('gulp-favicons')
const image_resize = require('gulp-image-resize');
const imagemin     = require('gulp-imagemin');


// local helpers
const taskDisabled = function() { log.warn('          ▲ vypnuto! ▲') }


// tasks
const createSitemap = function (done) {
	if (!build('sitemap')) { taskDisabled(); return done() };
	return src( path('dist') + '/**/*.' + conf('page_file_ext') )
		.pipe(sitemap({
			siteUrl: site('url')
		}))
		.pipe(dest(path('tmp')))
	done();
}

const createFavicon = function (done) {
	if (!build('favicon')) { taskDisabled(); return done() };
	return src( path('src') + '/favicon/favicon.png' )
		.pipe(favicon({
			appName: site('name'),
      appShortName: site('name'),
      appDescription: site('description'),
      developerName: conf('developer_name'),
      developerURL: conf('developer_url'),
      background: '#fff',
      path: path('favicon') + '/',
      url: site('url') + '/',
      display: 'standalone',
      orientation: 'portrait',
      scope: '/',
      start_url: '/',
      version: 1.0,
      logging: false,
      html: 'index.html',
      pipeHTML: true,
      replace: true,
		}))
		.pipe(dest(path('tmp') + '/favicon'))
	done();
}

const createImageSizes = function (done) {
  if (!build('img_resize')) { taskDisabled(); return done() };
  // vygeneruje responsivni verze obrazku u souboru s příznakem @r nebo @responsive (v názvu souboru)
	[500, 800, 1000, 1600, 2000, 2400].forEach(function (size) {
		src([ path('src') +'/img/**/*.{jpg,jpeg,png}' ])    
    .pipe(rename(function (path) { 
      path.basename = `${path.basename}@${size}w`
    }))
    .pipe(changed(path('dist') + '/' + path('img')))  
    .pipe(image_resize({
        width: size,
        upscale : false
      }))
    .pipe(imagemin())
    .pipe(dest(path('tmp') + '/' + path('img')))
  });
	done();
}

exports.sitemap = createSitemap
exports.favicon = createFavicon
exports.resize = createImageSizes
exports.create = series(createSitemap, createFavicon, createImageSizes);