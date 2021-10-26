const hasha = require('hasha')
const fs = require('fs')
const chalk = require('chalk')

module.exports = (input, flags, cli) => {
  if (input === undefined) {
    console.log(chalk.bold.red('⛔ ERROR: An input file needs to be provided.'))
    cli.showHelp()
    return
  }
  // if argumens are provided
  const data = {}
  input.forEach(filePath => {
    const hash = hasha.fromFileSync(filePath, { algorithm: 'md5' })
    // split filename
    const fileArray = filePath.split('.')
    // get file path without extension
    const filename = fileArray.slice(0, -1).join('.')
    // get file extension
    const extension = fileArray.pop()
    // create hashed filename
    const newFilename = `${filename}-${hash}.${extension}`
    // append hash to file
    fs.renameSync(filePath, newFilename)
    // add file version
    const plain = filePath.replace(flags.root, '')
    data[plain] = newFilename.replace(flags.root, '')
  })
  // save to json
  fs.writeFileSync(flags.manifest, JSON.stringify(data, null, 2))
}
