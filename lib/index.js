var rootstrapProcessor = require("./rootstrap-processor"),
    usage = require("./usage"),
    parseOptions = require("./parse-options");

function LessPluginRootstrap(options) {
    this.options = options;
};

LessPluginRootstrap.prototype = {
    install: function(less, pluginManager) {
        var rootstrap = rootstrapProcessor();
        pluginManager.addPreProcessor(new rootstrap(this.options));
    },
    printUsage: function () {
        usage.printUsage();
    },
    setOptions: function(options) {
        this.options = parseOptions(options);
    },
    minVersion: [2, 4, 0]
};

module.exports = LessPluginRootstrap;
