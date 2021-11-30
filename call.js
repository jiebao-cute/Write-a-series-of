var name = '时间跳跃'
const obj = {
    name: '玉洁，大宝贝'
}
function  fn(a,b,c){
    console.log(a + b + c + this.name)
}
//call方法
Function.prototype.Mycall = function (obj){
    //判断是否为null或者undefined,同时考虑传递参数不是对象情况
    obj = obj ? Object(obj) : window;
    const args = []
    for (let i = 1 ; i < arguments.length ; i++){
       // args.push(arguments[i])
        args.push("arguments[" + i + "]");
    }
    console.log(args)
    obj.fn = this
    eval('obj.fn('+ args + ')')//执行fn
    delete obj.fn//删除fn ,防止obj属性越来越多
}

// fn.Mycall('我的','名字','是')
// fn.Mycall(null, "我的", "名字", "是");

//Es6写法
Function.prototype.Mycall2 = function (obj){
    obj = obj ? Object(obj) : window
    obj.fn = this
    let args = [...arguments].slice(1)
    console.log(args)
    let result = obj.fn(...args)
    delete  obj.fn
    return result
}
fn.Mycall2(obj,'我的','名字','是')
fn.Mycall2(null, "我的", "名字", "是");