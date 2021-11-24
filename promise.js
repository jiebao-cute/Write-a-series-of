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

    onFulfilledCallback = null
    onRejectedCallback = null
    // 储存状态的变量，初始值是 pending
    status = PENDING
    // 成功之后的值
    value = null;
    // 失败之后的原因
    reason = null;

    // resolve和reject为什么要用箭头函数？
    // 如果直接调用的话，普通函数this指向的是window或者undefined
    // 用箭头函数就可以让this指向当前实例对象
    // 更改成功后的状态
    resolve = (value) => {
        if (this.status === PENDING) {
            this.status = FULFILLED
            this.value = value
            this.onFulfilledCallback && this.onFulfilledCallback(value)
        }
    }
    // 更改失败后的状态
    reject = (reason) => {
        if (this.status === PENDING) {
            this.status = REJECTED
            this.reason = reason
            this.onRejectedCallback && this.onRejectedCallback(reason)
        }
    }

    then(onFulfilled, onRejected) {
        if (this.status === FULFILLED) {
            onFulfilled(this.value)
        } else if (this.status === REJECTED) {
            onRejected(this.reason)
        } else if (this.status === PENDING) {
            // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
            // 等到执行成功失败函数的时候再传递
            this.onFulfilledCallback = onFulfilled
            this.onRejectedCallback = onRejected
        }
    }
}


const promise = new MyPromise((resolve, reject) => {
    setTimeout(()=>{
        reject('err')
    },0)

})

promise.then(value => {
    console.log('resolve', value)
}, reason => {
    console.log('reject', reason)
})
