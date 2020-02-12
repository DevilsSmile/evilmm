const imMysql = require('mysql')

/**
 *  实例化数据库连接
 *  @function
 *  @returns
 */
let funCreateConnection = (function () {
    let funDataBase = imMysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'evilmmdfjm0327',
        database : 'evilmm'
    })
    
    funDataBase.connect(function (funError) {
        if (funError) {
            return funError
        }
    })
    return funDataBase
})()

const output = {
    createConnection: funCreateConnection,
}

module.exports = output