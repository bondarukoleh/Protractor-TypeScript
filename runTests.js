const path = require('path')
const { init } = require('protractor/built/launcher');
const dotEnv = require('dotenv')
dotEnv.config()
const addConfig = {
  specs: process.env.SUITE ? [path.resolve(__dirname, process.env.SUITE)] : [path.resolve(__dirname, './specs/*.spec.ts')],
}

init(path.resolve(__dirname, './protractor.conf.js'), addConfig)