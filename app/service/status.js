const os = require('os')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const Service = require('egg').Service
class Status extends Service {
  // 获取系统信息
  async getStatus() {
    const { app, ctx } = this
    const G = 1024 * 1024 * 1024
    const dirc = await execShell('df -h')  // 查看磁盘目录
    const free = await execShell('free')  // 查看内存占用
    const memoryFree = free.length > 2 ? (free[1][6]) / (1024 * 1024) : null
    const memoryRate = free.length > 2 ? free[1][2] / free[1][1] : 0
    const system = {
      uptime: os.uptime(),
      platform: os.platform(),
      hostname: os.hostname(),
      release: os.release(),
      type: os.type(),
      arch: os.arch(),
      eol: os.EOL,
      dirc,
      endianness: os.endianness(),
      loadavg: os.loadavg(),
      network: os.networkInterfaces(),
      memory: { totalMem: (os.totalmem() / G).toFixed(2), memoryFree: memoryFree.toFixed(2),  memoryRate: numFix(memoryRate * 100, 2) },
      cpus: os.cpus(),
      constants: os.constants,
      userInfo: os.userInfo()
    }
    return system
  }
}

/**
 * 执行shell 命令
 */
async function execShell(cmd) {
  const { stdout, stderr } = await exec(cmd)
  if (stderr) return stderr
  let arr = stdout
    .split(/\n/) // 分割行
    .filter(x => !!x) // 分割并剔除空数组
    .map(el => el.split(/\s+/)) // 行内与元素分割
  return arr
}
//保留n位小数
function numFix(value, n) {
  return Math.round(value*Math.pow(10,n))/Math.pow(10,n)
}

module.exports = Status
