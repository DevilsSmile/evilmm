const imFileSystem = require('fs')

const involution = {
    0: '1',
    1: '2',
    2: '4',
    3: '8',
    4: '16',
    5: '32',
    6: '64',
    7: '128',
    8: '256',
    9: '512',
    10: '1024',
    11: '2048',
    12: '4096',
    13: '8192',
    14: '16384‬',
    15: '32768',
    16: '65536',
    17: '131072',
    18: '‭262144‬',
    19: '‭524288‬',
    20: '‭1048576‬',
    21: '‭2097152‬',
    22: '‭4194304‬',
    23: '‭8388608‬',
    24: '‭16777216‬',
    25: '‭33554432‬',
    26: '‭67108864‬',
    27: '‭134217728‬',
    28: '‭268435456‬',
    29: '‭536870912‬',
    30: '‭1073741824‬',
    31: '‭2147483648‬',
    32: '‭4294967296‬',
    33: '‭8589934592‬',
    34: '‭17179869184‬',
    35: '‭34359738368‬',
    36: '‭68719476736‬',
    37: '‭137438953472‬',
    38: '‭274877906944‬',
    39: '‭549755813888‬',
    40: '‭1099511627776‬',
    41: '‭2199023255552‬',
    42: '‭4398046511104‬',
    43: '‭8796093022208‬',
    44: '‭17592186044416‬',
    45: '‭35184372088832‬',
    46: '‭70368744177664‬',
    47: '‭140737488355328‬',
    48: '‭281474976710656‬',
    49: '‭562949953421312‬',
    50: '‭1125899906842624‬',
    51: '‭2251799813685248‬',
    52: '‭4503599627370496‬',
    53: '‭9007199254740992‬',
    54: '‭18014398509481984‬',
    55: '‭36028797018963968‬',
    56: '‭72057594037927936‬',
    57: '‭144115188075855872‬',
    58: '‭288230376151711744‬',
    59: '‭576460752303423488‬',
    60: '‭1152921504606846976‬',
    61: '‭2305843009213693952‬',
    62: '‭4611686018427387904‬',
    63: '‭9223372036854775808‬',
}

/**
 *  雪花算法对象。
 *  @constructor
 *  @param {nuber} paramBaseTimestamp - 起始时间戳
 *  @param {nuber} paramWorker - 机器标识
 *  @returns {string}
 */
function Snowflake (paramBaseTimestamp, paramWorker) {
    this.baseTimestamp = paramBaseTimestamp     // 起始时间
    this.lastTimestamp = paramBaseTimestamp     // 最近生成时间，用于对比是不是同一时间。
    this.worker = paramWorker                   // 机器标识
    this.sequence = 0                           // 序列记录
    
    this.bitHead = 1                            // 头部位数
    this.bitTimestamp = 41                      // 时间位数
    this.bitWorker = 10                         // 机器标识位数
    this.bitSequence = 12                       // 自增序列位数
}

/**
 *  雪花算法初始化。
 *      检查必要时间矫正文件是否存在,如果不存在则创建.
 *      date-distance.json 文件用于记录最后生成标识所用的时间, 如果服务器时间回滚, 则自动补充时间差, 避免生成重复标识.
 *  @function
 *  @returns {boolean}
 */
Snowflake.prototype.init = function () {
    let funDirname = __dirname
    let funFileName = 'date-distance.json'
    
    funDirname = (funDirname.replace(/tool/g, '') + funFileName).replace(/\\/g, '\\\\')
    if (!imFileSystem.existsSync(funDirname)) {
        console.log('creat file')
        imFileSystem.writeFile(funDirname, '{"lastTimestamp": ' + this.baseTimestamp + ', "distance": 0}', function error (paramError) {
            console.log(paramError)
            return false
        })
    }
    
    return true
}

/**
 *  生成雪花算法标识。
 *  @function
 *  @returns {string}
 */
Snowflake.prototype.create = function () {
    
    /**
     *  二进制转换十进制。
     *  @function
     *  @param {nuber} paramBinary - 二进制数字
     *  @returns {string}
     */
    function binaryToDecimal (paramBinary) {
        let funSumHead = 0
        let funSumTail = 0
        
        let funSumItems = []
        let funRegExpResult
        
        // 根据预定义的二进制乘方计算结果, 将结果放入计算数组中.
        for (let i = 0, len = paramBinary.length; i < len; i++) {
            if (paramBinary.charAt(i) === '1') {
                funRegExpResult = involution[paramBinary.length - 1 - i].match(/[0-9]+/)
                funSumItems.push(funRegExpResult[0])
            }
        }
        
        // 拆分计算数组中长度过大的整数字符串, 以便js能够正常计算.
        for (let i = 0, len = funSumItems.length; i < len; i++) {
            funRegExpResult = funSumItems[i].match(/^[0-9]+(?=[0-9]{10})/)
            funSumHead = funSumHead + (funRegExpResult ? Number(funRegExpResult[0]) : 0)
            
            funRegExpResult = funSumItems[i].match(/[0-9]{1,10}$/)
            funSumTail = funSumTail + (funRegExpResult ? Number(funRegExpResult[0]) : 0)
        }
        
        // 对于超出 funSumTail 最大位数的数值，加到 funSumHead 末尾上，最后合并计算结果。
        funRegExpResult = funSumTail.toString().match(/^[0-9]+(?=[0-9]{10})/)
        if (funRegExpResult) {
            funSumHead = funSumHead + Number(funRegExpResult[0])
        }
        
        return funSumHead.toString() + funSumTail.toString().match(/[0-9]{1,10}$/)[0]
    }
    
    // 判断 this.lastTimestamp 是否等于当前时间。
    // true :增加序列参数。
    // false:序列参数归零，并且重新记录 this.lastTimestamp 为当前时间。
    if (this.lastTimestamp === new Date().getTime()) {
        this.sequence = this.sequence + 1
    } else {
        this.lastTimestamp = new Date().getTime()
        this.sequence = 0
    }
    
    let funResult = ''
    let funBinary = ''
    let funNowTimestamp = (this.lastTimestamp - this.baseTimestamp).toString(2) // 时间戳二进制格式
    let funWorker = this.worker.toString(2)                                     // 机器的二进制格式
    let funSequence = this.sequence.toString(2)                                 // 序列的二进制格式
    
    while (funNowTimestamp.length < this.bitTimestamp) {
        funNowTimestamp = '0' + funNowTimestamp
    }
    
    while (funWorker.length < this.bitWorker) {
        funWorker = '0' + funWorker
    }
    
    while (funSequence.length < this.bitSequence) {
        funSequence = '0' + funSequence
    }
    
    // 生成二进制标识, 等待转换成十进制字符串.
    funBinary = '0' + funNowTimestamp + funWorker + funSequence
    funResult = binaryToDecimal(funBinary)
    console.log(funResult)
}

const Modular = function (paramBaseTimestamp, paramWorker) {
    return new Snowflake (paramBaseTimestamp, paramWorker)
}

module.exports = Modular