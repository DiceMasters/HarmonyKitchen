const gulp			= require('gulp'),
	  concat		= require('gulp-concat'),
	  cleanCSS		= require('gulp-clean-css'),
	  less			= require('gulp-less'),
	  autoprefixer 	= require('gulp-autoprefixer'),
	  modifyURL		= require('gulp-modify-css-urls'),
	  fileinclude	= require('gulp-file-include'),
	  replace		= require('gulp-replace'),
	  path			= require('path')

gulp.task('default', function(done) {
	gulp.parallel(['less', 'html'])

	done()
})

gulp.task('less', function(done) {
	gulp.src('./less/**/*.less')
		.pipe( concat('General.less'))
		.pipe( less({
			paths: [ path.join(__dirname, 'less', 'includes') ]
		}))
		.pipe( autoprefixer({
			overrideBrowserslist: ['>1% in RU', 'ie 11'],
			grid: true,
			cascade: false
		}))
		.pipe( cleanCSS({ level: 2 }))
		.pipe( modifyURL({
			modify(url, filePath) {
				if ( url.substring(0, 6) == '../../' )
					return `..${ url.substring(12) }`
				return `..${ url.substring(9) }`
			}
		}))
		.pipe( gulp.dest('./assets/styles/'))

	done()
})

gulp.task('html', function(done) {
	gulp.src('./html/*.html')
		.pipe( fileinclude({
			prefix: '@@',
			basepath: './html/'
		}))
		.pipe( replace('<img src="../../', '<img src="../'))
		.pipe( gulp.dest('./build/'))

	done()
})

gulp.watch(['less/**/*.less', 'html/**/*.html'], gulp.series(['less', 'html']))