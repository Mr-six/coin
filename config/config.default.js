const path = require('path')
module.exports = {
  keys: 'default_key',
  // 静态文件配置
  static: {
    prefix: '/static/',
    dir: path.join(__dirname, '..', 'dist/static')
  },
  // 端口
  cluster: { listen: { path: '', port: 3001, hostname: '' } },
  // 数据库
  mongo: {
    client: {
      host: 'localhost',
      port: '27017',
      name: 'bricks',
      user: '',
      password: '',
      options: {}
    }
  },
  redis: {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: '',
      db: 0
    }
  },
  // Mock测试借口地址
  mock: {
    MocoUrl: 'https://www.easy-mock.com/mock/5a6ee3604c02fb3139acf15b/br'
  },
  // 安全配置
  security: {
    csrf: {
      enable: false
    }
  }
}
