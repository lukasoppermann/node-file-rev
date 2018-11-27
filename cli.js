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

	Examples
	  $ node-file-rev assets/css/app.css,assets/js/app.js --manifest=assets/rev-manifest.json
`, {
	flags: {
		manifest: {
			type: 'string',
			alias: 'm',
      default: 'rev-manifest.json'
		}
	}
})
nodeFileRev(cli.input[0], cli.flags, cli)
