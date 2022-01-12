//vue响应式

const data = {
    name: '廖玉洁',
    age: 26,
    friend: {
        friendName: '小夏'
    },
    array:[1,1,2,4,6,7,8]
}
//重写数组
const oldValue = Array.prototype
const newValue = Object.create(oldValue)
    const arrayList =['push','pop','shift','unshift','splice']
        arrayList.forEach((item)=>{
        newValue[item] = function (){
            console.log('视图更新了')
            oldValue[item].call(this,...arguments)
        }
 }
)

//变成响应式数据
observe(data)

function observe(target) {
    if (typeof target !== 'object' || target == null) {
        return target
    }
    if (Array.isArray(target)){
        target.__proto__ = newValue
    }
    for (let key in target) {
        defineReactive(target, key, target[key])
    }

}

function defineReactive(target, key, value) {
    //深度观察
    observe(value)
    Object.defineProperty(target, key, {
        get() {
            return value
        },
        set(newValue) {
            //vue的$set方法，判断新值是不是对象
            observe(newValue)
            if (newValue !== value) {
                value = newValue
                console.log('更新试图')
            }
        }
    })
}

//data.age = {number:29}
//data.age.number = 22

//视图删除和更新，不会触发更新,vue2d的问题
//delete data.age //Vue.delete
//data.test = 'something' //Vue.set

data.array.push(78)
console.log(data.array.length)
