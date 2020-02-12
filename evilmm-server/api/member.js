
// const imSnowflake = require('./units/snowflake.js')
// let snowflake = imSnowflake(1262275200000, 0)
// snowflake.init()
// snowflake.create()

const imResponse = require('../database/response/index.js')
const imDataBase = require('../database/link.js')


/**
 * 注册用户相关操作模块。
 * @module my/pants
 * @see database-user.js
 */ 

const Modular = {
    /**
     *  判断当前注册名称是否重复。
     *  @function
     *  @param {string} paramUserName - 注册名称
     *  @returns {boolean}
     */
    isRepeatUserName: function (funRequest, funResponse) {
        let funUserName
        console.log('isRepeatUserName')
    },
    
    /**
     *  添加新的用户。
     *  @function
     *  @param {string} paramInsertInfo - { "account": xx, "password": xx, "mail": xx, "phone": xx }
     *  @returns {string}
     */
    insertUserInfo: function (paramInsertInfo) {
        console.log('insertUserInfo')
    },
    
    /**
     *  获取用户信息。
     *  @function
     *  @param {string} paramUpdateInfo - { "name": xx, "avatar": xx, "password": xx }
     *  @returns {string}
     */
    selectUserInfo: function (funRequestParam, funResponse) {
        let funDataBase = imDataBase.createConnection
        funDataBase.query('select name from evilmm.user', function (funError, funResult, fields) {
            if (funError) {
                console.log('fail', funError)
                return
            }
            
            console.log('■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■')
            console.log('selectUserInfo', funResult)
            imResponse(funResponse, '', funResult, '')
            funDataBase.end()
        })
    },

    /**
     *  更新用户信息。
     *      允许修改属性：名称，头像，密码。
     *  @function
     *  @param {string} paramUpdateInfo - { "name": xx, "avatar": xx, "password": xx }
     *  @returns {boolean}
     */
    updateUserInfo: function (paramUpdateInfo) {
        console.log('updateUserInfo')
    },
    
    /**
     *  用户登录。
     *  @function
     *  @param {string} paramSignInInfo - { "account": xx, "password": xx }
     *  @returns {string}
     */
    signIn: function (paramSignInInfo) {
        console.log('signIn')
    },
    
    /**
     *  用户退出。
     *  @function
     *  @param {string} paramSignInInfo - { "account": xx, "password": xx }
     *  @returns {boolean}
     */
    signOut: function (paramSignInInfo) {
        console.log('signOut')
    }
}

module.exports = Modular