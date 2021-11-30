function alone(arr){
  let arr2 = arr.sort()
    console.log(arr2)
  for (let i = 0 ; i < arr2.length;i++){
     for (let j = i + 1; j < arr2.length; j++){
         if(arr2[i] === arr2[j]){
            arr2.splice(j,1)
             j--
         }
     }
  }
  return arr2
}


//第二种
function alone2(arr){
    let arr2 = []
    for (let i = 0 ;i < arr.length;i++){
        if (arr2.indexOf(arr[i]) === -1 ){
            arr2.push(arr[i])
        }
    }
    return arr2
}

let arr = [1,1,4,4,2,2]
console.log(alone3(arr))

//第三种
function alone3(arr){
    let arr2 = []
    for (let i = 0;i<arr.length;i++){
        if (!arr2.includes(arr[i])){
            arr2.push(arr[i])
        }
    }
    return arr2
}

//第四种，可以去除NaN,{}的
function alone4(arr){
    let obj = {}
    let res = arr.filter((item)=>{
        if (obj.hasOwnProperty(typeof item + item)){
            return false
        }else {
            obj[typeof item + item] = true
            return true
        }
    })
    return res
}

let array = [{},{},NaN,NaN,'a','a',1,1,true,false,false]
console.log(alone4(array))