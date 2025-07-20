let countEl = document.getElementById("count-el")
let saveEl = document.getElementById("save-el")

console.log(countEl)

let count = 0

console.log(saveEl)

function increment(){
    count = count + 1
    countEl.innerText=count
    console.log(count)
}

function increment1(){
    count = count + 2
    countEl.innerText=count
    console.log(count)
}

function decrement(){
    count = count - 1
    countEl.innerText=count
    console.log(count)
}

function reset(){
    count = 0
    countEl.innerText=count
    console.log(count)

}

function save(){ 
    let countstr = count+ " , "
    saveEl.innerText += countstr 
    console.log(count)
}


   

