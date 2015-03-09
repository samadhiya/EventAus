var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
module.exports = {
  development: {
    db: 'mongodb://localhost/eventAus',
    rootPath: rootPath,
    port: process.env.PORT || 3000
  },
  production: {
    db: 'mongodb://eventaus:ausevent@ds043170.mongolab.com:43170/eventaus',
    rootPath: rootPath,
    port: process.env.PORT || 80
  }

}