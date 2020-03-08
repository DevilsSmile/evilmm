/**
 *  响应头部设置
 *  @module
 *  @param {object} funResponse
 *  @param {string} funType - 数据类型
 *  @return
 */
const output = function (funResponse, funType) {
    let funHeader = {
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Credentials': 'true'
    }
    switch (funType) {
        case 'js':
            funHeader['Content-Type'] = 'application/javascript;'
            funHeader['Cache-Control'] = 'max-age=36000'
            break
            
        case 'ico':
            funHeader['Content-Type'] = 'image/x-icon;'
            funHeader['Cache-Control'] = 'max-age=36000'
            break
    
        case 'map':
            funHeader['Content-Type'] = '*/*;'
            funHeader['Cache-Control'] = 'max-age=36000'
            break
    
        case 'css':
            funHeader['Content-Type'] = 'text/css;'
            funHeader['Cache-Control'] = 'max-age=36000'
            break

        case 'html':
            funHeader['Content-Type'] = 'text/html;'
            funHeader['Cache-Control'] = 'max-age=36000'
            break
            
        case 'text':
            funHeader['Content-Type'] = 'text/plain;'
            break
    }
    
    funResponse.writeHead(200, funHeader)
}

module.exports = output