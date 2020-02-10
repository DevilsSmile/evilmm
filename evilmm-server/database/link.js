const imMysql = require('mysql')

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
    /**
     *  创建数据库的连接。
     *  @function
     *  @returns {object}
     */
    createConnection: funCreateConnection,

    /**
     *  拆解参数对象，创建数据库查询命令。
     *  @function
     *  @param {string} funTable - 需要操作表格名称。
     *  @param {string} funCommandTyp - 需要操作类型，select，insert。
     *  @param {object} funRequestParam - 参数对象，包含表格键值以及数值。
     *  @returns {string}
     */
    createQueryString: function (funTable, funCommandType, funRequestParam) {
        let funKeys = Object.keys(funRequestParam)
        let funValues = Object.values(funRequestParam)
        let funKeysString = ''
        let funValuesString = ''
        
        for (let i = 0, len = funKeys.length; i < len; i++) {
            funKeys[i] = '`' + funKeys[i] + '`'
            funValues[i] = '"' + funValues[i] + '"'
        }
        
        funKeysString = funKeys.join(',')
        funValuesString = funValues.join(',')
        
        switch (funCommandType) {
            case 'insert':
                return funCommandType + ' into ' + funTable + ' ( ' + funKeysString + ') values (' + funValuesString + ');'
                break
                
            case 'select':
                // return funCommandType + ' * from ' + funTable + ' where ' ');'
                break
        }
    }
}

module.exports = output