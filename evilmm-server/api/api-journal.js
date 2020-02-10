const imSnowflake = require('../database/snowflake.js')

const imResponse = require('./response.js')
const imDataBase = require('../database/link.js')
const imDataBaseMessage = require('../database/message.js')

/**
 * 日志相关操作。
 * @module my/pants
 * @see database-journal.js
 */ 

const MO = {
    snowflake: undefined,
    
    // 查询当前数据 snowflake 表格,获取 worker ,以及 createdTime
    createSnowflake: function (funScene) {
        
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
     *      优先判断 MO.snowflake 实例是否存在。
     *          true：正常添加日志操作.
     *          false：先实例化 MO.snowflake 对象，然后再执行添加日志操作。
     *  @function
     *  @param {string} paramInsertInfo - { "account": xx, "password": xx, "mail": xx, "phone": xx }
     *  @returns {string}
     */
    insertJournalInfo: function (funRequestParam, funResponse) {
        let funJsonObject = JSON.parse(funRequestParam)
        
        let funQuery = ''
        let funDataBase = imDataBase.createConnection
        
        // 在初次添加日志时，初始对象，用于生成标识。
        if (MO.snowflake === undefined) {
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
                    
                    MO.snowflake = imSnowflake(funParam)
                    
                    // 添加日志内容
                    funJsonObject.id = MO.snowflake.create()
                    funQuery = imDataBase.createQueryString('evilmm.topics', 'insert', funJsonObject)
                    funDataBase.query(funQuery, function (funError, funResult) {
                        imResponse(funResponse, '', imDataBaseMessage(funError, funResult))
                    })
                }
            })
        } else {
            // 添加日志内容
            funJsonObject.id = MO.snowflake.create()
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

module.exports = MO