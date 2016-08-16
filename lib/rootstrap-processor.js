var path = require('path');

module.exports = function() {

    function rootstrapProcessor(options) {
        this.options = options || {};
    };

    // turn data into a string of less variables
    function makeLessVars(data) {

        var output = '';

        for (var varName in data) {
            if (Object.hasOwnProperty.call(data, varName)) {
                var value = data[varName];
                output += ((varName[0] === '@') ? '' : '@') + varName +': '+ value + ((('' + value).slice(-1) === ';') ? '' : ';') + "\n";
            }
        }

        return output.toString() + "\n";
    }

    function processConfigData(data) {

        var screens = data.devices,
        additionalVars = data.vars,
        screenvars = {}, minvarname, maxvarname,
        screenList = [], screenListMin = [], screenListMax = [],
        output = '';

        if (screens) {
            // build our screen vars
            Object.keys(screens).forEach(function(key) {

                // create list var arrays
                screenList.push(key);

                // set up list vars and add individual vars to lessData object

                if(screens[key].min == "") {
                    screenListMin.push('""');
                } else {
                    screenListMin.push(screens[key].min);
                    minvarname = key + "-min";
                    screenvars[minvarname] = screens[key].min;
                }

                if(screens[key].max == "") {
                    screenListMax.push('""');
                } else {
                    screenListMax.push(screens[key].max);
                    maxvarname = key + "-max";
                    screenvars[maxvarname] = screens[key].max;
                }
            });

            // add screen list vars to lessData object
            screenvars['screen-list'] = screenList.join(", ");
            screenvars['screen-list-min'] = screenListMin.join(", ");
            screenvars['screen-list-max'] = screenListMax.join(", ");

            output += makeLessVars(screenvars);
        }

        if (additionalVars) {
            output += makeLessVars(additionalVars);
        }

         return output;
    }

    rootstrapProcessor.prototype = {

        process : function (src, extra) {

            var injected = '@import "' + path.resolve(__dirname, '../') + '/node_modules/rootstrap/rootstrap.less";\n';
            injected += processConfigData(this.options.config);
            var ignored = extra.imports.contentsIgnoredChars;
            var fileInfo = extra.fileInfo;
            ignored[fileInfo.filename] = ignored[fileInfo.filename] || 0;
            ignored[fileInfo.filename] += injected.length;

            return injected + src;
        }
    };

    return rootstrapProcessor;

};
