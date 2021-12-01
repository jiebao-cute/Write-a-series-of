//防抖
function debounce(fun,time){
   let timer
    return function (){
       if (timer) {clearTimeout(timer)}
       let args = arguments
       timer = setTimeout(()=>{
           fun.apply(this,args)
       },time)

    }
}