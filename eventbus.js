var event = (function () {
    //为了查看方便挂window上面
    let eventObjs = {}
    return {
        //添加方法
        on: function (type, handle) {
            if (eventObjs[type]) {
                eventObjs[type].push(handle)
            } else {
                eventObjs[type] = []
                eventObjs[type].push(handle)
            }
        },
        //删除
        off: function (type, handle) {
            if (arguments.length === 0) {
                eventObjs = {}
            } else if (arguments.length === 1) {
                eventObjs[type] = []
            } else if (arguments.length === 2) {
                let newValue = eventObjs[type]
                if (newValue) {
                    //找到第一个就停止循环，如果有多个A函数，只能删除第一个
                    // const index = newValue.findIndex((value) => value === handle)
                    // if (index > 0) {
                    //     newValue.splice(index, 1)
                    // }
                    for (let i = newValue.length-1;i>=0;i--){
                        if(newValue[i] === handle){
                            newValue.splice(i , 1)
                        }
                    }
                }

            }
        },
        //调用
        emit: function (type, handle) {
            //第一个参数指向this
            let argus = Array.prototype.slice.call(arguments, 1)

            let newValue = eventObjs[type]
            if (newValue) {
                for (let fn of newValue) {
                    fn.call(null, argus)
                }
            }
        }
    }
})()

let c = function () {
    console.log('1')
}
let b = function (hh) {
    console.log(hh)
}
event.on('click', c)
event.on('click', b)
event.emit('click',2)
