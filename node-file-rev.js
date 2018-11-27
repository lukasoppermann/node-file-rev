const hasha = require('hasha')
const fs = require('fs')
const editJsonFile = require('edit-json-file')
const chalk = require('chalk')

module.exports = (files, flags, cli) => {
  if (files === undefined) {
    console.log(chalk.bold.red('⛔ ERROR: An input file needs to be provided.'))
    cli.showHelp()
    return
  }
  // if argumens are provided
  files.split(',').filter(file => file.length > 0).forEach( filePath => {
    hasha.fromFile(filePath, { algorithm: 'md5' }).then(hash => {
      // split filename
      let fileArray = filePath.split('.')
      // get file path without extension
      let filename = fileArray.slice(0, -1).join('.')
      // get file extension
      let extension = fileArray.pop()
      // create hashed filename
      let newFilename = `${filename}-${hash}.${extension}`
      // append hash to file
      fs.rename(filePath, newFilename, (err) => {
        if (err) {
          throw err
        }
        // If the file doesn't exist, the content will be an empty object by default.
        let jsonFile = editJsonFile(flags.manifest)
        // add file version
        jsonFile.set(filePath.replace(/\./g, '\\.').replace(flags.root,''), newFilename.replace(flags.root,''))
        // save to json
        jsonFile.save()
      })
    })
  })

}
