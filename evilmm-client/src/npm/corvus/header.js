/**
 *  xmlHttpResqust 表头设置函数
 *  @function
 *  @param {object} funXmlHttpRequest
 *  @param {string} funType - 发送数据类型标识
 *  @returns
 */
let output = function (funXmlHttpRequest, funType) {
    switch (funType) {
        case 'form':
            funXmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;')
            break
            
        case 'file':
            funXmlHttpRequest.setRequestHeader('Content-Type', 'multipart/form-data;')
            break

        case 'json':
            funXmlHttpRequest.setRequestHeader('Content-Type', 'application/json;')
            break

        default:
            funXmlHttpRequest.setRequestHeader('Content-Type', 'text/plain;')
            break
    }
}

module.exports = output