import imOption from './option'
import imSetHeader from './header'

/**
 *  xmlHttpResqust封装函数
 *  @function
 *  @param {object} funOption - 请求配置对象
 *  @returns
 */
let output = function (funOption) {
    // 完整的配置参数示例：{ url: 'request/path', data: 'unknown', type: 'custom', method: 'post', timeout: 10000 }
    funOption = Object.assign(imOption, funOption)

    let funPromise = new Promise(function (resolve, reject) {
        let funXhr = new XMLHttpRequest()
        funXhr.timeout = funOption.timeout
        funXhr.open(funOption.method, funOption.baseurl + funOption.url, true)

        // 根据发送的数据类型设置请求头部
        imSetHeader(funXhr, funOption.type)
        funXhr.send(funOption.data)
        funXhr.onreadystatechange = function () {
            if (funXhr.readyState !== 4) {
                return
            }
            let funStatus = funXhr.status
            if ((funStatus >= 200 && funStatus < 300) || funStatus === 304) {
                try {
                    resolve(funXhr.responseText)
                } catch (funError) {
                    reject(funError)
                }
            } else {
                reject(funXhr.responseText)
            }
        }
    })
    
    return funPromise
}

export default output