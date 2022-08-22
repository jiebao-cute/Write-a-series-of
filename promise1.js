const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(executor){
    this.status = 'PENDING'
    this.value = ''
    this.reason = ''
    this.onFulfilledCallback = []
    this.onRejectedCallback = []
    const resolve =(value)=>{
        if (this.status === 'PENDING'){
            this.status = 'FULFILLED'
            this.value = value
            this.onFulfilledCallback.forEach(fn => fn(this.value))
        }
    }
    const reject =( reason)=>{
        if (this.status === 'PENDING'){
            this.status = 'REJECTED'
            this.reason = reason
            this.onRejectedCallback.forEach(fn=> fn(this.reason))
        }
    }
    try{
        executor(resolve,reject)
    }catch (e){
        reject(e)
    }


}
MyPromise.prototype.then = function (successfunction,Failurefunction){
    let promise2 = new MyPromise((resolve,reject)=>{
        if (this.status === 'FULFILLED'){
            setTimeout(()=>{
               // 判断then的返回值是什么，也就是x
                //普通值直接调用resolve
                //如果是promise就去查看promise的返回结果，决定是调用resolve，h还是reject
                //为了防止then里面返回的是自己这个promise造成循环调用，进行判断
                let x = successfunction(this.value)
                resolvePromise(promise2,x,resolve,reject)
            },0)
        }else if (this.status === 'REJECTED'){
          Failurefunction(this.reason)
        }else {
            this.onFulfilledCallback.push(successfunction)
            this.onRejectedCallback.push(Failurefunction)
        }
    })
   return promise2
}
//判断then 的返回值是promis还是正常值
let resolvePromise = function(promise2,x,resolve,reject){
    if (promise2 === x){

        return reject(new TypeError('循环调用，返回的是自己的promise'))
    }
    //如果返回的是promise就去调用返回的promis.then去判断状态，将值传进去
    if (x instanceof MyPromise){
        x.then((value)=>{resolve(value)},(reason)=>{reject(reason)})
   }else {
        resolve(x)
    }
}

//测试例子

const p = new MyPromise((resolve,reject)=>{
        resolve('成功1')

})

function test1(){
    return new MyPromise((resolve,reject)=>{
        resolve('other')
    })
}
let p1 = p.then((res)=>{
       console.log(res)
        return p1
    },
    (reason)=>{
        console.log(reason)
    })
p1.then((res)=>{
        console.log(res)

    },
    (reason)=>{
        console.log(reason)
    })