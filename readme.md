# node-file-rev

> Simple node cli tool to revision files and write them to a rev-manifest.json

## Features
- add an md5 revision hash to one or multiple files
- create / update a JSON revision manifest file

## Install
```
$ npm install node-file-rev
```

## Usage

```
$ node-file-rev assets/app.css
```

Use a comma separated list (NO spaces) for multiple files.
```
$ node-file-rev assets/css/app.css,assets/js/*.js
```

Use the `--manifest` flag to change the manifest file name and location.
```
$ node-file-rev assets/css/app.css,assets/js/app.js --manifest=assets/rev.json
```

Use the `--root` flag to specify the root directory e.g. `assets/` this will be removed from the filepath in the manifest file.
```
assets/css/app.css => css/app.css
```
