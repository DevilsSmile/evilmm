const imFileSystem = require('fs')
const imResponse = require('../database/response/index.js')

/**
 * 相册相关接口
 * @module my/pants
 * @see database-journal.js
 */
const output = {    
    /**
     *  访问域名时返回 index.html 文件作为网站入口
     *  @function
     *  @param {string} funRequestData
     *  @param {object} funResponse
     *  @returns
     */
    returnHtml: function (funRequestData, funResponse) {
        let funReadStream = imFileSystem.createReadStream('./html/index.html', 'utf-8')
        // imResponse(funResponse, 20050, 'html', funReadStream.pipe(funResponse))
        funResponse.writeHead(200, {
            'Content-Type': 'text/html'
        })
        funReadStream.pipe(funResponse)
    },
}

module.exports = output