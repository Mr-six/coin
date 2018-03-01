const os = require('os')
const Service = require('egg').Service
class Status extends Service {
  // 获取系统信息
  async getStatus() {
    const { app, ctx } = this
    const G = 1024 * 1024 * 1024
    const system = { uptime: os.uptime(), platform: os.platform(), hostname: os.hostname(), release: os.release(), type: os.type(), arch: os.arch(), eol: os.EOL, endianness: os.endianness(), loadavg: os.loadavg(), network: os.networkInterfaces(), memory: { freemem: os.freemem() / G, totalmem: os.totalmem() / G }, cpus: os.cpus(), constants: os.constants, userInfo: os.userInfo() } // 换行符 // 字节次序 // 平均负载 // 网络
    return system
  }
}

module.exports = Status
