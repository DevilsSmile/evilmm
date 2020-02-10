const imSnowflake = require('../database/snowflake/index.js')

const imResponse = require('./response.js')
const imDataBase = require('../database/link.js')
const imDataBaseMessage = require('../database/message.js')

const imFileSystem = require('fs')
const imTencentCOS = require('cos-nodejs-sdk-v5')


/**
 * 相册相关接口
 * @module my/pants
 * @see database-journal.js
 */
const output = {
    bucketInfo: {
        bucket: 'image-1256588539',
        region: 'ap-shanghai',
        secretId: 'AKID8BUioOcE4UAfDflrdSJTVl8mkbLtfxPE',
        secretKey: 'FQpV7YrT0jItS1eUHsMiS6FF7vcNp8Uf',
    },

    snowflake: undefined,
    
    /**
     *  接收前端发送的图片并且储存相关信息
     *  @function
     *  @param {string} funRequestData
     *  @param {object} funResponse
     *  @returns
     */
    insertAlbumImage: function (funRequestData, funResponse) {
        function effect () {
            // 上传相册文件到腾讯云的对象储存空间
            let funTencentCOS = new imTencentCOS ({
                SecretId: output.bucketInfo.secretId,
                SecretKey: output.bucketInfo.secretKey
            })

            funTencentCOS.putObject({
                Bucket: output.bucketInfo.bucket,
                Region: output.bucketInfo.region,
                Key: 'album/123456789.jpg',                                     // 储存空间内的文件命名
                StorageClass: 'STANDARD',
                Body: imFileSystem.createReadStream('./upload/test.jpg'),       // 需要上传的文件路径
                onProgress: function(progressData) {
                    console.log(JSON.stringify(progressData))
                }
            }, function(err, data) {
                console.log(err || data)
            })
        }



        let funRegExp

        // 获取文件后缀 data:image/xxxx;
        funRegExp = new RegExp('(?<=data:image\/)[a-zA-Z]+')
        let funFileType = funRequestData.match(funRegExp)[0]

        // 获取图片 base64 实际内容
        let funBase64 = funRequestData.replace(/^data:image\/\w+;base64,/, '')
        let funBuffer = new Buffer(funBase64, 'base64')
        imFileSystem.writeFile('test.' + funFileType, funBuffer, function (funError) {
            if (funError) {
                console.log(funError)
            } else {
                console.log('写入成功！')
            }
        })
        imResponse(funResponse, '', 'ok')
    },

    /**
     *  formdata 形式的图片保存
     *  @function
     *  @param {string} funRequestData
     *  @param {object} funResponse
     *  @returns
     */
    insertAlbumImageFormData: function (funRequestData, funResponse) {
        let funRegExp
        let funResult

        // 获取数据边界 WebKitFormBoundary
        funRegExp = new RegExp('\\w+')
        funResult = funRequestData.match(funRegExp)[0]
        let funWebKitFormBoundary = funResult
        let funBoundaryHead = '------' + funWebKitFormBoundary
        let funBoundaryTail = '------' + funWebKitFormBoundary + '--'

        // 获取文件名称 filename="xxxx.xx"
        funRegExp = new RegExp('(?<=filename=)"[\u4e00-\u9fa5a-zA-Z.-~!@#$%^&-=+]*\"')
        funResult = funRequestData.toString().match(funRegExp)[0]
        let funFileName = funResult.substring(1, funResult.length - 1)

        // 获取文件类型 Content-Type: xxxx
        funRegExp = new RegExp('Content-Type: \\S+')
        funResult = funRequestData.toString().match(funRegExp)[0]
        let funFileType = funResult

        // 获取文件数据流
        let funFileStream = funRequestData.substring(funRequestData.indexOf(funFileType) + funFileType.length)
        funFileStream = funFileStream.replace(funBoundaryTail, '')
        funFileStream = funFileStream.replace(/^[\f\n\r\t\v]*/, '')
        funFileStream = funFileStream.replace(/[\f\n\r\t\v]*$/, '')

        let funWriterStream = imFileSystem.createWriteStream('./' + funFileName)
        funWriterStream.write(funFileStream, 'utf8')                    // { txt: 'utf8', }
        funWriterStream.end()
        funWriterStream.on('finish', function () {
            //删除刚刚创建好的本地文件 -> 只有在把文件存起来的时候需要删除掉本地，否则不要用。
            // imFileSystem.unlinkSync(uploadDirFile) 
        })
    },
    
    /**
     *  删除已有日志。
     *  @function
     *  @param {object} funRequest
     *  @param {object} funResponse
     *  @returns {boolean}
     */
    deleteJournal: function (funRequest, funResponse) {
        
        let funUserName
        console.log('isRepeatUserName')
    },
    
    /**
     *  添加新的日志。
     *      优先判断 output.snowflake 实例是否存在。
     *          true：正常添加日志操作.
     *          false：先实例化 output.snowflake 对象，然后再执行添加日志操作。
     *  @function
     *  @param {string} paramInsertInfo - { "account": xx, "password": xx, "mail": xx, "phone": xx }
     *  @returns {string}
     */
    insertJournalInfo: function (funRequestParam, funResponse) {
        let funJsonObject = JSON.parse(funRequestParam)
        
        let funQuery = ''
        let funDataBase = imDataBase.createConnection
        
        // 在初次添加日志时，初始对象，用于生成标识。
        if (output.snowflake === undefined) {
            funDataBase.query('select * from evilmm.snowflake where scene = 0;', function (funError, funResult) {
                // 表示数据表里没有数据，直接插入新数据。
                if (funResult.length === 0) {
                    let funParam = {
                        worker: 0,
                        scene: 0,
                        launch: 1579449600,
                        created: 1579449600,
                        modified: 0
                    }
                    funQuery = imDataBase.createQueryString('evilmm.snowflake', 'insert', funParam)
                    funDataBase.query(funQuery, function (funError, funResult) {})
                } else {
                    let funParam = {
                        worker: funResult[funResult.length - 1].worker + 1,
                        scene: 0,
                        launch: 1579449600,
                        created: funResult[funResult.length - 1].created,
                        modified: 0
                    }
                    
                    // 如果当前时间小于 created 表示本地时间已经发生回滚，需要计算补偿时间。
                    if (Math.round(new Date() / 1000) < funParam.created) {
                        funParam.modified = funParam.created - Math.round(new Date() / 1000) + 1
                    }
                    
                    funQuery = imDataBase.createQueryString('evilmm.snowflake', 'insert', funParam)
                    funDataBase.query(funQuery, function (funError, funResult) {})
                    
                    output.snowflake = imSnowflake(funParam)
                    
                    // 添加日志内容
                    funJsonObject.id = output.snowflake.create()
                    funQuery = imDataBase.createQueryString('evilmm.topics', 'insert', funJsonObject)
                    funDataBase.query(funQuery, function (funError, funResult) {
                        imResponse(funResponse, '', imDataBaseMessage(funError, funResult))
                    })
                }
            })
        } else {
            // 添加日志内容
            funJsonObject.id = output.snowflake.create()
            funQuery = imDataBase.createQueryString('evilmm.topics', 'insert', funJsonObject)
            funDataBase.query(funQuery, function (funError, funResult) {
                imResponse(funResponse, '', imDataBaseMessage(funError, funResult))
            })
        }
    },

    /**
     *  更新日志信息。
     *  @function
     *  @param {string} paramUpdateInfo - { "name": xx, "avatar": xx, "password": xx }
     *  @returns {boolean}
     */
    updateJournalInfo: function (paramUpdateInfo) {
        console.log('updateUserInfo')
    },

    /**
     *  查询日志列表。
     *  @function
     *  @param {string} paramInsertInfo - { "account": xx, "password": xx, "mail": xx, "phone": xx }
     *  @returns {string}
     */
    queryTopics: function (funRequestParam, funResponse) {
        let funJsonObject = JSON.parse(funRequestParam)
        
        let funQuery = ''
        let funDataBase = imDataBase.createConnection
        
        funDataBase.query('select id, title, time from evilmm.topics;', function (funError, funResult) {
            imResponse(funResponse, '', imDataBaseMessage(funError, funResult))
        })
    },
    
    /**
     *  获取日志具体内容。
     *  @function
     *  @param {object} funRequest
     *  @param {object} funResponse
     *  @returns {string}
     */
    queryTopicInfo: function (funRequestParam, funResponse) {
        
        let funJsonObject = JSON.parse(funRequestParam)
        console.log('selectJournalInfo', funJsonObject)
        
        let funQuery = ''
        let funDataBase = imDataBase.createConnection
        
        funQuery = imDataBase.createQueryString('evilmm.topics', 'select', funJsonObject)
        funDataBase.query('select * from evilmm.topics where id = ' + funJsonObject.id + ';', function (funError, funResult) {
            imResponse(funResponse, '', imDataBaseMessage(funError, funResult))
        })
    },
}

module.exports = output