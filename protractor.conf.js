require('ts-node/register')

/* in runtime when ts-node compile .ts => .js
 output directory from tsconfig becomes root directory
 that's why we set the protractor config like we don't have the built folder */
module.exports = require('./config/protractor.conf')