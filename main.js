const income = document.querySelector(".income")
const expanse = document.querySelector(".expanse")
const cost = document.getElementById("cost")
const purpose = document.getElementById("purpose")

const costes = document.getElementById("costes")
const purposes = document.getElementById("purposes")


const tbody1 = document.getElementById("tb1")
const tbody2 = document.getElementById("tb2")
const totalH1 = document.getElementById("total")

let localSave = JSON.parse(localStorage.getItem("allitems"))||[]


income.addEventListener("submit",(event)=>{
    event.preventDefault()
    if(!cost.value.length>0 && !purpose.value.length>0 && !parseInt(cost.value)>0) return
    let obj = {
        maqsad:purpose.value,
        sum:"+"+cost.value
                }
    localSave.push(obj)
    localStorage.setItem("allitems",JSON.stringify(localSave))
    render(JSON.parse(localStorage.getItem("allitems")))
    totalFunc()
    cost.value = ""
    purpose.value = ""
    
})

expanse.addEventListener("submit",(event)=>{
    event.preventDefault()
    if(!costes.value.length>0 && !purposes.value.length>0 && !parseInt(costes.value)>0) return
    let obj = {
        maqsad:purposes.value,
        sum:"-"+costes.value
                }
    localSave.push(obj)
    localStorage.setItem("allitems",JSON.stringify(localSave))
    render(JSON.parse(localStorage.getItem("allitems")))
    totalFunc()
    costes.value = ""
    purposes.value = ""
})

render(JSON.parse(localStorage.getItem("allitems"))||[])

function render(lst){
    tbody1.innerHTML = null
    tbody2.innerHTML = null
    if(!lst.length>0) return

    for(let j of lst){
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")
        let button = document.createElement("button")
        let tr = document.createElement("tr")
        button.classList = "del"
        button.textContent = "X"
        td3.append(button)
        tr.append(td1,td2,td3)

        if(parseInt(j.sum)>=0){
            td1.textContent = j.maqsad
            tbody1.append(tr)
            td2.textContent = "+"+parseInt(j.sum)+"$"
            
        }
        else{
            td1.textContent = j.maqsad
            tbody2.append(tr)
            td2.textContent = parseInt(j.sum)+"$"
        }

        button.addEventListener("click",()=>{
            let lst = JSON.parse(localStorage.getItem("allitems"))
            let filter = lst.filter((el)=>{
                if(!(el["maqsad"]==j["maqsad"] && el["sum"]==j["sum"])){
                    return el
                }
            })

            render(filter)
            localStorage.setItem("allitems",JSON.stringify(filter))
            totalFunc()
        })
    }
}

totalFunc()

function totalFunc(){
    let total = 0
    let lst = JSON.parse(localStorage.getItem("allitems"))
    for(let j of lst){
        total += parseInt(j.sum)
    }
    totalH1.textContent = total

}