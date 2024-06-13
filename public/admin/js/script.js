// Alert

const alert = document.querySelector(".alert-success");
if(alert){
    const close = alert.querySelector("#alert-close");
    close.addEventListener("click", () =>{
        alert.classList.add("hiden");
    });
}

// Check box
const checkAll = document.querySelector("input[name='checkall']");
const checkmultiItems = document.querySelectorAll("input[name='id']");
if(checkmultiItems){
    let ids = [];

    checkAll.addEventListener("click", ()=>{
        if(checkAll.checked ){
            checkmultiItems.forEach(itemCheck =>{
                itemCheck.checked = true;
            })
        }else{
            checkmultiItems.forEach(itemCheck =>{
                itemCheck.checked = false;
            })
        }

    })

    checkmultiItems.forEach(itemCheck => {
        
        itemCheck.addEventListener("click", () => {
            const countChecked = document.querySelectorAll("input[name='id']:checked").length;
            
            if(countChecked == checkmultiItems.length){
                checkAll.checked = true;
            }else{
                checkAll.checked = false;
            }
        })
    })
}
