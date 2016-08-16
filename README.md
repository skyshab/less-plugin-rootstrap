less-plugin-rootstrap
========================

Imports [Rootstrap](http://rootstrap.io/) mixins before your custom Less code.

## lessc usage

Install..

requires Less v2.4.0

```
npm install -g less-plugin-rootstrap
```

and then on the command line,

```
lessc file.less --rootstrap
```


## Programmatic usage

```
var LessPluginRootstrap = require('less-plugin-rootstrap'),
    rootstrapPlugin = new LessPluginRootstrap();
less.render(lessString, { plugins: [rootstrapPlugin] })
  .then(
```

## Browser usage

Browser usage is not supported at this time.
