// 先定义三个常量表示状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
    constructor(executor) {
        // executor 是一个执行器，进入会立即执行
        // 并传入resolve和reject方法
        executor(this.resolve, this.reject)
    }

    PromiseResult = null
    onFulfilledCallback = []
    onRejectedCallback = []
    status = PENDING
    resolve = (value) => {
        if (this.status === PENDING) {
            this.status = FULFILLED
            this.PromiseResult = value
            while (this.onFulfilledCallback.length) {
                this.onFulfilledCallback.shift()(this.PromiseResult)
            }
        }
    }
    // 更改失败后的状态
    reject = (reason) => {
        if (this.status === PENDING) {
            this.status = REJECTED
            this.PromiseResult = reason
            while (this.onRejectedCallback.length) {
                this.onRejectedCallback.shift()(this.PromiseResult)
            }
        }
    }

    then(onFulfilled, onRejected) {
        var promise2 = new MyPromise((resolve, reject) => {
            // 参数校验，确保一定是函数
            onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
            onRejected = typeof onRejected === 'function' ? onRejected : reason => {
                throw reason
            }
            const resolvePromise = (cb) => {
                try {

                    const x = cb(this.PromiseResult)
                    console.log(x)
                    if (x === promise2) {
                        // 不能返回自身哦
                        throw new Error('不能返回自身')
                    }
                    // 判断x是不是 MyPromise 实例对象
                    if (x instanceof MyPromise) {

                        // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
                        // x.then(value => resolve(value), reason => reject(reason))
                        x.then(resolve, reject)
                    } else {

                        // 普通值
                        resolve(x)
                    }
                } catch (reason) {
                    reject(reason)
                }
            }
            if (this.status === FULFILLED) {
                resolvePromise(onFulfilled)
            } else if (this.status === REJECTED) {
                resolvePromise(onRejected)
            } else if (this.status === PENDING) {
                // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
                // 等到执行成功失败函数的时候再传递
                this.onFulfilledCallback.push(resolvePromise.bind(this, onFulfilled))
                this.onRejectedCallback.push(resolvePromise.bind(this, onRejected))
            }
        })
        return promise2
    }
}


const promise = new MyPromise((resolve, reject) => {
    //setTimeout(()=>{
    resolve('success')
    //})

})

function other() {
    return new MyPromise((resolve, reject) => {
        resolve('other')
    })
}

promise.then(value => {
    console.log(1)
    console.log('resolve', value)
    return other()
}).then(value => {
    console.log(2)
    console.log('resolve', value)
})
