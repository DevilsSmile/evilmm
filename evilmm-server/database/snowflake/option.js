/**
 *  雪花算法基准时间配置
 *  @module 
 *  @returns {object}
 */
let output = {
    scene: 0,
    worker: 0,                  // 机器标识，每次时间发生回滚，则该参数递增。
    launch: 1579449600,         // 时间起点
    created: 1579449600,        // 最后创建标识使用的时间，也用于判断本地系统时间是否发生回滚。
    modified: 0,                // modified = created - local
}

module.exports = output