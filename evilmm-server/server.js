let imUrl = require('url')
let imHttp = require('http')
let imRoute = require('./route/route.js')

const Modular = {
    start: function () {
        let funServer = imHttp.createServer()
        
        funServer.on('request', function (funRequest, funResponse) {
            let funPathname = imUrl.parse(funRequest.url).pathname
            
            // 屏蔽系统自带的无关请求
            if (funPathname !== '/favicon.ico') {
                imRoute(funRequest, funPathname, funResponse)
            }
        })
        
        funServer.listen(8888, function () {})
        console.log('server has started...')
    }
}

module.exports = Modular