var gulp 	= require('gulp');

var uglify 	= require('gulp-uglify');
var jshint 	= require('gulp-jshint');
var concat 	= require('gulp-concat');
var gulpSequence = require('gulp-sequence');
var rename 	= require("gulp-rename");
var rev 	= require("gulp-rev");
var revCollector = require("gulp-rev-collector");
var del 	= require("del");
var flatten = require("gulp-flatten");
var tar = require('gulp-tar');
var gzip = require('gulp-gzip');
var replace = require('gulp-replace');
var prefix = require('gulp-prefix');
var moduleName = "richAnchor";

var relativePath = "app/" + moduleName + "/";


gulp.task('process-images', function () {
   return gulp.src(relativePath + 'image/*')
      .pipe(gulp.dest('build'));
});

// gulp.task('process-htmls', function () {
//    return gulp.src(relativePath + 'index.html')
//       .pipe(rename({
//       	extname: ".php"
//       }))
//       .pipe(gulp.dest('build/'));
// });

gulp.task('process-phps', function () {
   return gulp.src(relativePath + '*.php')
      .pipe(gulp.dest('build/'));
});
gulp.task('process-scripts', function () {
   return gulp.src(relativePath + 'dist/*.js')
      // .pipe(jshint())
      // .pipe(jshint.reporter('default'))
      .pipe(uglify())
      //.pipe(concat('app.js'))
      .pipe(gulp.dest('build'))
      
});
gulp.task('process-images', function () {
   return gulp.src(relativePath + 'dist/*.{png,jpg}')
      // .pipe(jshint())
      // .pipe(jshint.reporter('default'))
      //.pipe(uglify())
      //.pipe(concat('app.js'))
      .pipe(gulp.dest('build'))
      
});

//加md5 start
gulp.task('process-manifest', function () {
   return gulp.src([
   		'build/*.{png,jpg,js}'
   	],{base: './build'})
      .pipe(rev())
      .pipe(gulp.dest('build'))
      .pipe(rev.manifest({
            // base: '/tb/static-ala/' + moduleName,
            // merge: true // merge with the existing manifest (if one exists)

        }))
      .pipe(gulp.dest('build/rev/'));
});

gulp.task('process-rev', function () {
   return gulp.src([
			'build/rev/*.json',
			'build/*.{js}',
			'build/*.{html,php}',
		],{base: './build'})
      	.pipe(revCollector({
      		replaceReved: true,
      	}))
      	.pipe(gulp.dest('build'));
});
//加md5 end


gulp.task('process-output-static', function(){
	return gulp.src(['./build/*.{png,jpg,js}'],{base: "./build/"})
		.pipe(gulp.dest('output/static-ala/tb/static-ala/'+ moduleName));
});
gulp.task('process-output-template', function(){
	return gulp.src(['./build/*.php'])
		.pipe(replace(/<script type=\"text\/javascript\" src=\"dist\/(.*\.js)\"><\/script>/g, function($0,$1,$2){
	   	  	return '<script type="text/javascript" src="/tb/static-ala/'+moduleName+'/'+$1+'"></script>';
	   	  }))
		.pipe(gulp.dest('output/ala/ala/control/' + moduleName));
});

gulp.task('process-tar-static', function(){
	return gulp.src(['./output/static-ala/**/*'])
      	.pipe(tar('static-ala.tar'))
        .pipe(gzip())
      	.pipe(gulp.dest('output'));
});
gulp.task('process-tar-template', function(){
	return gulp.src(['./output/ala/**/*'])
      	.pipe(tar('ala.tar'))
        .pipe(gzip())
      	.pipe(gulp.dest('output'));
});

gulp.task('process-del', function (cb) {
  del([
    'build/rev',
    'output/ala/',
    'output/static-ala/'
  ], cb);
});

// gulp.task('watch', function() {
//   	gulp.watch('app/dist/*.js', ['process-scripts']);
// });
// gulp.task('build', function() {
// 	gulpSequence(['process-scripts', 'process-images', 'process-htmls'], 'process-manifest', 'process-rev', 'process-del')(cb);
	
// });
gulp.task('test', function(cb) {
  gulpSequence(
    ['process-scripts', 'process-images', 'process-phps'], 
    'process-manifest', 
    'process-rev', 
    ['process-output-static',
    'process-output-template'],
    ['process-tar-static',
    'process-tar-template']
    )(cb);
});
gulp.task('default', function(cb) {
	gulpSequence(
    ['process-scripts', 'process-images', 'process-phps'], 
		'process-manifest', 
		'process-rev', 
		['process-output-static',
		'process-output-template'],
		['process-tar-static',
		'process-tar-template'],
		'process-del'
		)(cb);
});