function  _new(Constru,...arguments){
    //创建一个新对象，并为它指定原型
    let obj = Object.create(Constru.prototype)
    //将 this 指向 obj,并执行 Constru, 将 Constru 的属性添加到 obj,并改名字为 result
    const result = Constru.call(obj,...arguments)
    //判断是否有手动返回  没有则返回第一步对象
    return result instanceof Object ? result : obj
}