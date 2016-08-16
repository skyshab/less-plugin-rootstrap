less-plugin-rootstrap
========================

Imports [Rootstrap](https://github.com/skyshab/rootstrap-library/) mixins before your custom Less code.

## lessc usage

Install..

requires Less v2.4.0

```
npm install -g less-plugin-rootstrap
```

## Programmatic usage

This example shows how to use the plugin in your gulpfile.js

```

// LESS configuration
var gulp = require('gulp');
var less = require('gulp-less');

// load rootstrap
var rootstrapConfig = require('./rootstrap-config.json'),
rootstrap = require('less-plugin-rootstrap'),
rootstrapPlugin = new rootstrap({'config': rootstrapConfig});

gulp.task('default', function() {
    gulp.watch('./public/less/*.less', ['less-public']);
});

gulp.task('less-public', function() {
  gulp.src('./public/less/division-public.less')
    .pipe(less({ plugins: [rootstrapPlugin] }))
    .pipe(gulp.dest('./public/css/'));
});


```
