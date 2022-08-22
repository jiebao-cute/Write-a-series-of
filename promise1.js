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
               // console.log(this.value)
                let x = successfunction(this.value)
                resolvePromise(x,resolve,reject)
            })
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
let resolvePromise = function(x,resolve,reject){
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
p.then((res)=>{
    console.log(res)
        return test1()
    },
    (reason)=>{
        console.log(reason)
    }).then((res)=>{
        console.log(res)
    },
    (reason)=>{
        console.log(reason)
    })