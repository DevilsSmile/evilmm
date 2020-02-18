/**
 * 路由模块，集中处理接收到的请求，并且分发给制定处理函数。
 * @module route
 * @see route.js
 */
const imPath = require('path')
const imFileSystem = require('fs')
const imUrlType = require('./url.js')

const imApiHome = require('../api/home.js')                     // 主页
const imApiAlbum = require('../api/album.js')                   // 相册
const imApiTopic = require('../api/topic.js')                   // 话题
const imApiRecord = require('../api/record.js')                 // 记录
const imApiMember = require('../api/member.js')                 // 成员

const imResponse = require('../database/response/index.js')

/** 
 *  请求路径与响应处理函数的匹配对象。
 *      新增请求逻辑需要在该对象下添加对应的属性，以及对应的处理函数。
 *  @constant
 *  @type {object}
 */
let routeHandle = {
    ['/topic/queryTopics']: imApiTopic.queryTopics,
    ['/topic/queryTopicInfo']: imApiTopic.queryTopicInfo,
    ['/topic/insertTopicInfo']: imApiTopic.insertTopicInfo,

    ['/record/queryRecord']: imApiRecord.queryRecord,
    ['/record/queryRecordInfo']: imApiRecord.queryRecordInfo,
    ['/record/insertRecordInfo']: imApiRecord.insertRecordInfo,

    ['/album/queryAlbum']: imApiAlbum.queryAlbum,
    ['/album/insertAlbumImage']: imApiAlbum.insertAlbumImage,
}

/**
 *  根据 http 携带的信息执行对应逻辑
 *      分析 url 判断本次请求目的
 *      接收 body 中的数据
 *  @function
 *  @param {object} funRequest
 *  @param {object} funResponse
 *  @returns
 */
let Modular = function route(funRequest, funResponse, funRootPath) {
    let funUrlInfo = imUrlType('https://user:password@sub.example.com:80' + funRequest.url)
    switch (funUrlInfo.type) {
        case 'file':
            imFileSystem.readFile(imPath.join(funRootPath + funUrlInfo.filePath), function (funError, funData) {
                if (funError) {
                    imResponse(funResponse, 20058, 'text', 404)
                } else {
                    imResponse(funResponse, 20050, funUrlInfo.fileType, funData)
                }
            })
            break

        case 'function':
            if (typeof routeHandle[funUrlInfo.apiPath] === 'function') {
                switch (funRequest.method) {
                    case 'GET':
                        routeHandle[funUrlInfo.apiPath](funUrlInfo.apiParam, funResponse)
                        break

                    case 'POST':
                        let funRequestData = ''
                        /**
                         *  接收 http 数据
                         *  拼接二进制数据以得到完整的数据
                         *  @event route#data
                         *  @type {function}
                         */
                        funRequest.on('data', function (funBinary) {
                            funRequestData = funRequestData + funBinary.toString()
                        })
                    
                        /**
                         *  数据接收完成事件
                         *  接收完整数据后进一步分析 url 以执行对应操作
                         *  @event route#data
                         *  @type {function}
                         */
                        funRequest.on('end', function () {
                            routeHandle[funUrlInfo.apiPath](funRequestData, funResponse)
                        })
                        break
                }
            }
            break

        default:
            imResponse(funResponse, 20058, 'text', 404)
            break
    }
}

module.exports = Modular