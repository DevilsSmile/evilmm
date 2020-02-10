/**
 * 路由模块，集中处理接收到的请求，并且分发给制定处理函数。
 * @module route
 * @see route.js
 */
const imApiUser = require('../api/api-user.js')
const imApiAlbum = require('../api/api-album.js')
const imApiJournal = require('../api/api-journal.js')

/** 
 * 请求路径与响应处理函数的匹配对象。
 *      新增请求逻辑需要在该对象下添加对应的属性，以及对应的处理函数。
 * @constant
 * @type {object}
 */
let routeHandle = {
    ['/user/isrepeatusername']: imApiUser.isRepeatUserName,
    ['/user/selectuserinfo']: imApiUser.selectUserInfo,
    
    ['/journal/insertJournalInfo']: imApiJournal.insertJournalInfo,
    ['/topics/queryTopics']: imApiJournal.queryTopics,                          // 查询日志列表
    ['/topics/queryTopicInfo']: imApiJournal.queryTopicInfo,                    // 查询日志具体内容

    ['/album/insertAlbumImage']: imApiAlbum.insertAlbumImage,                   // 上传相册图片
}

/**
 *  请求统一处理函数。
 *      1，对请求合法性做校验，检验token，请求来源，以及其他加密验证信息。
 *      2，对合法的请求
 *      允许修改属性：名称，头像，密码。
 *  @function
 *  @param {object} funRequest
 *  @param {string} funPathname
 *  @param {object} funResponse
 *  @returns default
 */
let Modular = function route(funRequest, funPathname, funResponse) {
    if (typeof routeHandle[funPathname] === 'function') {
        let funRequestData = ''
        /**
         * 请求数据接收事件。
         *      把所有请求发送过来的二进制数据拼接，最终得到完整的数据。
         * @event route#data
         * @type {function}
         */
        funRequest.on('data', function (funBinary) {
            funRequestData = funRequestData + funBinary.toString()
        })
        
        /**
         * 请求数据接收结束事件。
         *      只有数据被完整接收时，才会将数据分发给特定的函数处理。
         * @event route#data
         * @type {function}
         */
        funRequest.on('end', function () {
            // console.log('■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■')
            // console.log(funRequestData)
            routeHandle[funPathname](funRequestData, funResponse);
        })
    } else {
        funResponse.writeHead(200, {'Content-Type': 'text/plain'})
        funResponse.write('404');
        funResponse.end();
    }
}

module.exports = Modular