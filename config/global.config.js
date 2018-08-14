/**
 * @description: 通用配置
 * @author: xx
 * @date: 2018-08-07 14:46:36
 */
const windowTitle = '智能锁运维平台'
const logoName = '运维平台'

// 开发环境配置
const devIp = 'localhost'
const devInterfacePORT = '3000'

// 生产环境配置
const prodIp = 'localhost'
const prodInterfacePORT = '3000'

// 判断环境
const serverIP = process.env.NODE_ENV === 'production'?prodIp:devIp;
const interfacePORT =  process.env.NODE_ENV === 'production'?prodInterfacePORT:devInterfacePORT;

module.exports = {
  windowTitle,
  logoName,
  serverUrl: 'http://'+serverIP, // 服务器IP地址
  interfaceUrl: 'http://'+serverIP+':'+interfacePORT+'/api/', // 服务器端接口访问地址
}
