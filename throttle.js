//节流
function throttle(fn, time) {
    let canUse = true
    return function () {
    if (canUse){
        fn.call(this,arguments)
        canUse = false
        setTimeout(()=>{canUse = true},time)
    }
    }
}