let imHttp = require('http')
let imRoute = require('./route/route.js')

let funServerIP = '192.168.1.2'
let funServerPort = 80
let funServer = imHttp.createServer()

/**
 *  http 接收事件
 *  @function
 *  @param {object} funRequest - http://nodejs.cn/api/http.html#http_class_http_incomingmessage
 *  @param {object} funResponse - http://nodejs.cn/api/http.html#http_class_http_serverresponse
 *  @returns
 */
funServer.on('request', function (funRequest, funResponse) {
    imRoute(funRequest, funResponse, __dirname)
})

/**
 *  http 监听属性设置
 *  @function
 *  @param {number} funServerPort
 *  @param {string} funServerIP
 *  @returns
 */
funServer.listen(funServerPort, funServerIP)
console.log('server has started...')