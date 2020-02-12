/**
 *  根据使用场景初始实例
 *  @module 
 *  @param {number} funScene - 0-topic, 1-comment, 2-album, 3-image
 *  @return {function}
 */

const imDataBase = require('../link.js')
const imKeyValues = require('../key-values.js')

const imSnow = require('./create.js')
const imOption = require('./option.js')

/**
 *  根据使用场景初始实例
 *  @function
 *  @param {number} funScene - 0-topic, 1-comment, 2-album, 3-image
 *  @return {promise}
 */
const output = function (funScene) {
    let funPromise = new Promise(function (resolve, reject) {
        let funDataBase = imDataBase.createConnection
        funDataBase.query('select * from evilmm.snowflake where scene = ' + funScene + ';', function (funError, funResult) {
            // 表示数据表里没有数据，直接插入新数据。
            if (funResult.length === 0) {
                let funOption = JSON.parse(JSON.stringify(imOption))
                funOption.scene = funScene
    
                let funObject = imKeyValues(funOption)
                let funQuery = 'INSERT INTO evilmm.snowflake (' + funObject.keys + ') VALUES (' + funObject.values + ');'
                funDataBase.query(funQuery, function (funError, funResult) {
                    // 返回雪花算法实例，此处需要补充数据库错误验证。
                    resolve(imSnow(funOption))
                })
            } else {
                let funOption = JSON.parse(JSON.stringify(imOption))
                funOption.scene = funScene
                funOption.worker = funResult[funResult.length - 1].worker + 1
                funOption.created = funResult[funResult.length - 1].created
                
                // 如果当前时间小于 created 表示本地时间已经发生回滚，需要计算补偿时间。
                if (Math.round(new Date() / 1000) < funOption.created) {
                    funOption.modified = funOption.created - Math.round(new Date() / 1000) + 1
                }
                
                let funObject = imKeyValues(funOption)
                let funQuery = 'INSERT INTO evilmm.snowflake (' + funObject.keys + ') VALUES (' + funObject.values + ');'
                funDataBase.query(funQuery, function (funError, funResult) {
                    // 返回雪花算法实例，此处需要补充数据库错误验证。
                    resolve(imSnow(funOption))
                })
            }
        })
    })
    
    return funPromise
}

module.exports = output