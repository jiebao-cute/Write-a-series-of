const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(executor){
   // console.log('执行promise')
    this.status = 'PENDING'
    this.value = ''
    this.reason = ''
    this.onFulfilledCallback = []
    this.onRejectedCallback = []
    const resolve =(value)=>{
        if (this.status === 'PENDING'){
            this.status = 'FULFILLED'
            this.value = value
            this.onFulfilledCallback.forEach(fn => fn())
        }
    }
    const reject =( reason)=>{
        if (this.status === 'PENDING'){
            this.status = 'REJECTED'
            this.reason = reason
            this.onRejectedCallback.forEach(fn=> fn())
        }
    }
    //try是为了在执行promise的时候捕获错误，手动返回reject
    try{
        executor(resolve,reject)
    }catch (e){
        reject(e)
    }
}
MyPromise.prototype.then = function (successfunction,Failurefunction){
    let promise2 = new MyPromise((resolve,reject)=>{
         //console.log('执行then')
        if (this.status === 'FULFILLED'){
            setTimeout(()=>{
               // 判断then的返回值是什么，也就是x
                //普通值直接调用resolve
                //如果是promise就去查看promise的返回结果，决定是调用resolve，h还是reject
                //为了防止then里面返回的是自己这个promise造成循环调用，进行判断
                //try catch是为了捕获在then里面执行的函数报错的时候可以手动reject传给下一次的then函数
                try{
                    let x = successfunction(this.value)
                    resolvePromise(promise2,x,resolve,reject)
                }catch (e){
                    reject(e)
                }

            },0)
        }else if (this.status === 'REJECTED'){
            //settimeout是为了让then 能取到 promise2
            setTimeout(()=>{
                // 判断then的返回值是什么，也就是x
                //普通值直接调用resolve
                //如果是promise就去查看promise的返回结果，决定是调用resolve，h还是reject
                //为了防止then里面返回的是自己这个promise造成循环调用，进行判断
                //try catch是为了捕获在then里面执行的函数报错的时候可以手动reject传给下一次的then函数
                try{
                    let x = Failurefunction(this.reason)
                    resolvePromise(promise2,x,resolve,reject)
                }catch (e){
                    reject(e)
                }

            },0)

        }else {
            this.onFulfilledCallback.push(()=>{
                setTimeout(()=>{
                    // 判断then的返回值是什么，也就是x
                    //普通值直接调用resolve
                    //如果是promise就去查看promise的返回结果，决定是调用resolve，h还是reject
                    //为了防止then里面返回的是自己这个promise造成循环调用，进行判断
                    //try catch是为了捕获在then里面执行的函数报错的时候可以手动reject传给下一次的then函数
                    try{
                        let x = successfunction(this.value)
                        resolvePromise(promise2,x,resolve,reject)
                    }catch (e){
                        reject(e)
                    }

                },0)
                }
            )
            this.onRejectedCallback.push(()=>{
                setTimeout(()=>{
                    // 判断then的返回值是什么，也就是x
                    //普通值直接调用resolve
                    //如果是promise就去查看promise的返回结果，决定是调用resolve，h还是reject
                    //为了防止then里面返回的是自己这个promise造成循环调用，进行判断
                    //try catch是为了捕获在then里面执行的函数报错的时候可以手动reject传给下一次的then函数
                    try{
                        let x = Failurefunction(this.reason)
                        resolvePromise(promise2,x,resolve,reject)
                    }catch (e){
                        reject(e)
                    }

                },0)
            })
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
    setTimeout(()=>{
        resolve('成功1......')
    },2000)

})
//测试返回的是个promise
function test1(){
    //console.log('test')
    return new MyPromise((resolve,reject)=>{
        //console.log('testpromis')
        resolve('other')
    })
}
p1 = p.then((res)=>{
    //console.log('p1的then')
        console.log(res)
        return test1()
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