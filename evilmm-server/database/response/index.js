/**
 *  响应设置模块
 *  @module
 *  @param {object} funResponse - 请求连接对象
 *  @param {number} funCode - 状态编号
 *  @param {string} funType - 数据类型
 *  @param {string} funData - 具体数据
 *  @return
 */

const imState = require('./state.js')
const imHeader = require('./header.js')

/**
 *  根据使用场景初始实例
 *  @function
 *  @param {number} funScene - 0-topic, 1-comment, 2-album, 3-image
 *  @return {promise}
 */
const output = function (funResponse, funCode, funType, funData) {
    imHeader(funResponse, funType)
    
    let funResultData = imState(funCode)
    funResultData.data = funData
    funResponse.write(JSON.stringify(funResultData)) 
    funResponse.end()
}

module.exports = output