const path = require('path')
exports.keys = 'default_key';
exports.static = {
  prefix: '/static/',
  dir: path.join(__dirname, '..', 'dist/static')
}
exports.cluster = { listen: { path: '', port: 3001, hostname: '' } }

exports.mongo = {
  client: {
    host: 'localhost',
    port: '27017',
    name: 'bricks',
    user: '',
    password: '',
    options: {}
  }
}
