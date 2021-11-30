var name = '时间跳跃'
const obj = {
    name: '玉洁，大宝贝'
}
function  fn(a,b,c){
    console.log(a + b + c + this.name)
}

Function.prototype.MyApply = function (obj,arr){
    obj = obj ? Object(obj) : window//判断obj是真是假，真的就等于Object（obj）
    obj.fn = this
    let result
    if (!arr){
        result = obj.fn()
    }else {
        result = obj.fn(...arr)
    }
    delete obj.fn
    return result
}

fn.MyApply(obj,['我的','名字','是'])
fn.MyApply(null,['我的','名字','是'])