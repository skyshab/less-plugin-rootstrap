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

This example shows how to use the plugin in your gulpfile.js. A JSON configuration file is required to pass into the plugin object on creation.

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

Here is an example rootstrap-config.json file. In addition to defining device breakpoints, you can add any other LESS variables you want defined in your project.

```
{
    "devices" : {
        "mobile" : {
            "min" : "",
            "max" :  "480.001px"
        },
        "tablet" : {
            "min" : "481px",
            "max" :  "980.001px"
        },
        "desktop" : {
            "min" : "981px",
            "max" :  ""
        }
    },
    "vars" : {
        "mytestvar" : "500px"
    }
}

```


Screen name and breakpoints list variables will be added automatically to your stream. For example:

```
@screen-list: mobile, tablet, desktop;
@screen-list-min: "", 768px, 981px;
@screen-list-max: 767px, 980px, "";

```
The plugin will also generate variables for the min and max values of each device. From the previous example, the following would be available within your LESS files:

```
@mobile-min: "";
@mobile-max: 767px;
@tablet-min: 768px;
@tablet-max: 980px;
@desktop-min: 981px;
@desktop-max: "";

```

To apply styles within a specific screen range within your LESS files:

```
/* In one LESS file */

    .screen('default') {
        .my-selector {
            color: white;
        }    
    }

    .screen('tablet-and-under') {
        .my-selector {
            color: red;
        }
    }

    .screen('desktop') {
        .my-selector {
            color: blue;
        }
    }


/* In another LESS file */

    .screen('tablet-and-under') {
        .my-other-selector {
            width: 100%;
        }
    }


/* In your output LESS file */

    /* output all styles */
    .get-screens();

```

The above would output the following CSS:

```
.my-selector {
    color: white;
}

@media screen and (max-width: 980px) {
    .my-selector {
        color: red;
    }  

    .my-other-selector {
        width: 100%;
    }      
}

@media screen and (min-width: 981px) {
    .my-selector {
        color: blue;
    }    
}

```
