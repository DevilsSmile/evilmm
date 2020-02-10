const MO = function (funError, funResult) {
    if (funError) {
        let funCode = {
            code: funError.errno,
            message: funError.sqlMessage
        }
        return JSON.stringify(funCode)
    }

    if (funResult !== undefined) {
        let funCode = {
            code: 20050,
            message: 'request success',
            data: funResult
        }
        return JSON.stringify(funCode)
    }
    
    return JSON.stringify({ code: 20059, message: 'unknown error' })
}

module.exports = MO