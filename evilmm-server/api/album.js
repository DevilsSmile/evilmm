const imFileSystem = require('fs')
const imTencentCOS = require('cos-nodejs-sdk-v5')

const imDataBase = require('../database/link.js')
const imResponse = require('../database/response/index.js')
const imKeyValues = require('../database/key-values.js')
const imCreateSnow = require('../database/snow/index.js')
const imCloudSecret = require('../cloud/secret.js')

/**
 * 相册相关接口
 * @module my/pants
 * @see database-journal.js
 */
const output = {
    snow: undefined,
    
    /**
     *  接收前端发送的图片并且储存至云空间
     *  @function
     *  @param {string} funRequestData
     *  @param {object} funResponse
     *  @returns
     */
    insertAlbumImage: function (funRequestData, funResponse) {
        /**
         *  获取 base64 图片保存到本地
         *  @function
         *  @param {string} funImageId - 文件标识
         *  @returns
         */
        function saveUploadImage (funImageId) {
            let funRegExp

            // 获取文件后缀 data:image/xxxx;
            funRegExp = new RegExp('(?<=data:image\/)[a-zA-Z]+')
            let funFileType = funRequestData.match(funRegExp)[0]
    
            // 获取图片 base64 实际内容
            let funBase64 = funRequestData.replace(/^data:image\/\w+;base64,/, '')
            let funBuffer = new Buffer(funBase64, 'base64')
            let funFileName = funImageId + '.' + funFileType
            let funFilePath = './upload/'
            imFileSystem.writeFile(funFilePath + funFileName, funBuffer, function (funError) {
                if (funError) {

                } else {
                    uploadCloud(funFilePath, funFileName)
                }
            })
        }

        /**
         *  上传本地图片到云空间
         *  @function
         *  @param {string} funFilePath - 文件路径
         *  @param {string} funFileName - 文件名称
         *  @returns
         */
        function uploadCloud (funFilePath, funFileName) {
            // 上传相册文件到腾讯云的对象储存空间
            let funTencentCOS = new imTencentCOS ({
                SecretId: imCloudSecret.secretId,
                SecretKey: imCloudSecret.secretKey
            })

            funTencentCOS.putObject({
                Bucket: imCloudSecret.bucket,
                Region: imCloudSecret.region,
                Key: 'album/' + funFileName,                                                    // 储存空间内的文件命名
                StorageClass: 'STANDARD',
                Body: imFileSystem.createReadStream(funFilePath + funFileName),                 // 需要上传的文件路径
                // onProgress: function(progressData) {
                //     console.log(JSON.stringify(progressData))
                // }
            }, function(funError, funData) {
                if (funError) {

                }

                if (funData) {
                    imFileSystem.unlinkSync(funFilePath + funFileName)
                    imResponse(funResponse, 20050, 'text', null)

                    saveImageInfo(funData.Location, funFileName, 1)
                }
            })
        }

        /**
         *  记录图片信息到数据库
         *  @function
         *  @param {string} funUrlPath - 文件网络路径
         *  @param {string} funFileName - 文件名称
         *  @param {string} funPriority - 图片置顶权重
         *  @returns
         */
        function saveImageInfo (funUrlPath, funFileName, funPriority) {
            // 获取文件名称 xxxx.jpg
            let funRegExp = new RegExp('[0-9]+')
            let funFileId = funFileName.match(funRegExp)[0]

            let funImageInfo = {
                id: funFileId,
                url: 'https://' + funUrlPath,
                priority: funPriority
            }

            let funDataBase = imDataBase.createConnection
            let funObject = imKeyValues(funImageInfo)
            let funQuery = 'INSERT INTO evilmm.album (' + funObject.keys + ') VALUES (' + funObject.values + ');'
            funDataBase.query(funQuery, function (funError, funResult) {

            })
        }

        // 判断 id 生成对象是否初始化
        if (output.snow === undefined) {
            imCreateSnow(2)
            .then(function (funResult) {
                output.snow = funResult
                saveUploadImage(output.snow.create())
            })
            .catch(function (funError) {
                console.log('imCreateSnow Error', funError)
            })
        } else {
            saveUploadImage(output.snow.create())
        }
    },

    /**
     *  formdata 形式的图片保存
     *  @function
     *  @param {string} funRequestData
     *  @param {object} funResponse
     *  @returns
     */
    // insertAlbumImageFormData: function (funRequestData, funResponse) {
        // let funRegExp
        // let funResult

        // // 获取数据边界 WebKitFormBoundary
        // funRegExp = new RegExp('\\w+')
        // funResult = funRequestData.match(funRegExp)[0]
        // let funWebKitFormBoundary = funResult
        // let funBoundaryHead = '------' + funWebKitFormBoundary
        // let funBoundaryTail = '------' + funWebKitFormBoundary + '--'

        // // 获取文件名称 filename="xxxx.xx"
        // funRegExp = new RegExp('(?<=filename=)"[\u4e00-\u9fa5a-zA-Z.-~!@#$%^&-=+]*\"')
        // funResult = funRequestData.toString().match(funRegExp)[0]
        // let funFileName = funResult.substring(1, funResult.length - 1)

        // // 获取文件类型 Content-Type: xxxx
        // funRegExp = new RegExp('Content-Type: \\S+')
        // funResult = funRequestData.toString().match(funRegExp)[0]
        // let funFileType = funResult

        // // 获取文件数据流
        // let funFileStream = funRequestData.substring(funRequestData.indexOf(funFileType) + funFileType.length)
        // funFileStream = funFileStream.replace(funBoundaryTail, '')
        // funFileStream = funFileStream.replace(/^[\f\n\r\t\v]*/, '')
        // funFileStream = funFileStream.replace(/[\f\n\r\t\v]*$/, '')

        // let funWriterStream = imFileSystem.createWriteStream('./' + funFileName)
        // funWriterStream.write(funFileStream, 'utf8')                    // { txt: 'utf8', }
        // funWriterStream.end()
        // funWriterStream.on('finish', function () {
        //     //删除刚刚创建好的本地文件 -> 只有在把文件存起来的时候需要删除掉本地，否则不要用。
        //     // imFileSystem.unlinkSync(uploadDirFile) 
        // })
    // },
    
    /**
     *  删除已有日志。
     *  @function
     *  @param {object} funRequest
     *  @param {object} funResponse
     *  @returns {boolean}
     */
    // deleteJournal: function (funRequest, funResponse) {
        
    //     let funUserName
    //     console.log('isRepeatUserName')
    // },

    /**
     *  查询相册图片列表
     *  @function
     *  @param {string} funRequestData - { index: 0, number: 0 }
     *  @param {object} funResponse
     *  @returns
     */
    queryAlbum: function (funRequestData, funResponse) {
        let funRequestParam = JSON.parse(funRequestData)

        let funLimit = funRequestParam.number
        let funOffset = funRequestParam.index * funRequestParam.number
        
        let funDataBase = imDataBase.createConnection
        let funQuery = 'SELECT * FROM evilmm.album LIMIT ' + funLimit + ' OFFSET ' + funOffset + ';'
        funDataBase.query(funQuery, function (funError, funResult) {
            imResponse(funResponse, 20050, 'text', funResult)
        })
    },
    
    /**
     *  获取日志具体内容。
     *  @function
     *  @param {object} funRequest
     *  @param {object} funResponse
     *  @returns {string}
     */
    // queryTopicInfo: function (funRequestParam, funResponse) {
        
    //     let funJsonObject = JSON.parse(funRequestParam)
    //     console.log('selectJournalInfo', funJsonObject)
        
    //     let funQuery = ''
    //     let funDataBase = imDataBase.createConnection
        
    //     funQuery = imDataBase.createQueryString('evilmm.topics', 'select', funJsonObject)
    //     funDataBase.query('select * from evilmm.topics where id = ' + funJsonObject.id + ';', function (funError, funResult) {
    //         imResponse(funResponse, '', imMessage(funError, funResult))
    //     })
    // },
}

module.exports = output