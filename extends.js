//es5函数继承
function A (name,color){
    this.name = name
    this.color = color
}
A.prototype.sayHi = function (){
    console.log('你好,我是A')
}
function B (name,age){
    //解决了继承无法传参数的问题
    A.call(this,name)
    this.age =  age
}
//如果在B函数上直接使用new会导致属性重复，造成不必要的浪费
function C(){}
C.prototype = A.prototype
B.prototype = new  C()
B.prototype.constructor = B
B.prototype.sayHi = function (){
    console.log('你好，我是B')
}
//测试
const test = new B('yujie','18')
test.sayHi()
console.log(test.name)
console.log(Object.getPrototypeOf(test))

//类继承
class Animal {
    constructor(color) {
     this.color = color
    }
    sayHi(){
        console.log('我来自A')
    }
}
class Dog extends Animal {
    constructor(color,name) {
        super();
        this.color = color
        this.name = name
    }
    move(){
        console.log('我来自B')
    }
}
// 测试
let dog = new Dog('blue','frank')
console.log(dog.name)
console.log(dog.color)
dog.move()
dog.sayHi()