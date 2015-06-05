var gulp = require('gulp'),
    es = require('event-stream'),
    reduce = require("stream-reduce"),
    gutil = require('gulp-util'),
    objectAssign = require('object-assign');

var files = ['a', '/b', 'c/d', '/c/e'];
var opts = [{'cwd' : 'this-is-root'},
            {'root': 'this-is-root'},
            {'cwd' : 'this-is-root',
             'root': 'this-is-root'}];

gulp.task('default', function() {
    var streams = [];
    gutil.log('glob is', files);
    opts.forEach(function(opt) {
        streams.push(gulp.src(files, objectAssign({}, opt))
            .pipe(reduce(function(acc, file) {
                return acc.concat([file.relative]);
            }, []).on('data', function(data) {
                gutil.log(opt, 'captures', data);
            })));
    });
    es.merge.apply(this, streams);
});
