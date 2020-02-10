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
        case 'text':
            funHeader['Content-Type'] = 'text/plain'
            break
    }
    
    funResponse.writeHead(200, funHeader)
}

module.exports = output