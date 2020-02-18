const imDataBase = require('../database/link.js')
const imResponse = require('../database/response/index.js')
const imKeyValues = require('../database/key-values.js')
const imCreateSnow = require('../database/snow/index.js')


/**
 * 日志相关操作。
 * @module my/pants
 * @see database-journal.js
 */ 

const output = {
    snow: undefined,
    
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
     *  添加话题详细信息
     *  @function
     *  @param {string} funRequestData
     *  @param {object} funResponse
     *  @returns
     */
    insertTopicInfo: function (funRequestData, funResponse) {
        function saveTopicInfo (funTopicId) {
            funTopicInfo = JSON.parse(funRequestData)
            funTopicInfo.id = funTopicId

            let funDataBase = imDataBase.createConnection
            let funObject = imKeyValues(funTopicInfo)
            let funQuery = 'INSERT INTO evilmm.topics (' + funObject.keys + ') VALUES (' + funObject.values + ');'
            funDataBase.query(funQuery, function (funError, funResult) {
                imResponse(funResponse, 20050, 'text', funResult)
            })
        }

        // 判断 id 生成对象是否初始化
        if (output.snow === undefined) {
            imCreateSnow(0)
            .then(function (funResult) {
                output.snow = funResult
                saveTopicInfo(output.snow.create())
            })
            .catch(function (funError) {
                console.log('imCreateSnow Error', funError)
            })
        } else {
            saveTopicInfo(output.snow.create())
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
     *  查询话题列表
     *  @function
     *  @param {string} funRequestData
     *  @param {object} funResponse
     *  @returns
     */
    queryTopics: function (funRequestData, funResponse) {
        let funDataBase = imDataBase.createConnection
        
        // 日志分类 category = 0
        let funQuery = 'SELECT id, time, title, abstract, category FROM evilmm.topics WHERE category = 0;'
        funDataBase.query(funQuery, function (funError, funResult) {
            for (let i = 0, len = funResult.length; i < len; i++) {
                let funDate = new Date(funResult[i].time.toString())
                funResult[i].time = funDate.getFullYear() + '-' + (funDate.getMonth() + 1) + '-' + funDate.getDate()
                funResult[i].time = funResult[i].time + '  ' + funDate.getHours() + ':' + funDate.getMinutes() + ':' + funDate.getSeconds()
            }
            imResponse(funResponse, 20050, 'text', funResult)
        })
    },
    
    /**
     *  查询话题详细信息
     *  @function
     *  @param {string} funRequestData
     *  @param {object} funResponse
     *  @returns
     */
    queryTopicInfo: function (funRequestData, funResponse) {
        let funRequestParam = JSON.parse(funRequestData)
        
        let funDataBase = imDataBase.createConnection
        let funQuery = 'SELECT * FROM evilmm.topics WHERE id = ' + funRequestParam.id + ';'
        funDataBase.query(funQuery, function (funError, funResult) {
            for (let i = 0, len = funResult.length; i < len; i++) {
                let funDate = new Date(funResult[i].time.toString())
                funResult[i].time = funDate.getFullYear() + '-' + (funDate.getMonth() + 1) + '-' + funDate.getDate()
                funResult[i].time = funResult[i].time + '  ' + funDate.getHours() + ':' + funDate.getMinutes() + ':' + funDate.getSeconds()
            }
            imResponse(funResponse, 20050, 'text', funResult)
        })
    },
}

module.exports = output