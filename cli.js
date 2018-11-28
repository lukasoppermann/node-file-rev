#!/usr/bin/env node
'use strict'

const argv = require('yargs').argv
const meow = require('meow')
const nodeFileRev = require('./node-file-rev')

const cli = meow(`
	Usage
	  $ node-file-rev <input>

	Options
	  --manifest, -m  Specify the path to the manifest file, default rev-manifest.json
    --root, -r Specify a root path this will be removed from the file path in the manifest

	Examples
	  $ node-file-rev assets/css/app.css,assets/js/app.js --manifest=assets/rev-manifest.json
`, {
  flags: {
    manifest: {
      type: 'string',
      alias: 'm',
      default: 'rev-manifest.json'
    },
    root: {
      type: 'string',
      alias: 'r'
    }
	}
})
nodeFileRev(cli.input, cli.flags, cli)
