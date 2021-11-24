function _new(Constru, ...arguments) {
    //创建一个新对象，并为它指定原型
    let obj = Object.create(Constru.prototype)
    //将 this 指向 obj,并执行 Constru, 将 Constru 的属性添加到 obj,并改名字为 result
    const result = Constru.call(obj, ...arguments)
    //判断cd是否有手动返回  没有则返回第一步对象
    return result instanceof Object ? result : obj
}

//测试
function foo() {
    this.name = 'ciel'
    this.arg = arguments[0]
}

foo.prototype.callName = function () {
    console.log(this.name)
}
// 测试
let test = _new(foo, 'hhh', '123', 'saf')
console.log(Object.getPrototypeOf(test))
test.callName()
console.log(test.arg)
