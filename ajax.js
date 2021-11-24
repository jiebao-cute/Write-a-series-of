const request = new XMLHttpRequest()
request.open('GET','/a/b/c?name=ff')
request.onreadystatechange = function (){
    if (request.status === 200 && request.readyState === 4){
        console.log(request.responseText)
    }
}
request.send()