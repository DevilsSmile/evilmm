const output = function (funObject) {
    let funKeys = Object.keys(funObject)
    let funValues = Object.values(funObject)

    let funReturnKeys = ''
    let funReturnValues = ''

    for (let i = 0, len = funKeys.length; i < len; i++) {
        funKeys[i] = '`' + funKeys[i] + '`'
        funValues[i] = '"' + funValues[i] + '"'
    }

    funReturnKeys = funKeys.join(',')
    funReturnValues = funValues.join(',')

    return { keys: funReturnKeys, values: funReturnValues }
}

module.exports = output