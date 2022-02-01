const bill = document.getElementById('inp-bill');
const tipBtns = document.querySelectorAll('.tip');
const tipCustom = document.getElementById('inp-tip');
const people = document.getElementById('inp-people');
const errmsg = document.getElementById('err-msg')
const result = document.querySelectorAll('.value');
const resetBtn = document.querySelector('.reset')


// console.log(bill.value);
bill.addEventListener('input',setBillValue);
tipCustom.addEventListener('input',setCustTipValue);
people.addEventListener('input',setPeopleValue);
resetBtn.addEventListener('click',reset);


tipBtns.forEach(btn =>{
    btn.addEventListener('click',handleClick)
});

let billValue = 0.0;
let tipValue = 0.15;
let peopleValue = 1;

function validateFloat(s){
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
}

function validateInt(s){
    var rgx = /^[0-9]*/;
    return s.match(rgx);
}

function setBillValue(){
        if(bill.value.includes(',')){
            bill.value =  bill.value.replace(',','.')
        }

        if(!validateFloat(bill.value)){
          bill.value = bill.value.substring(0,bill.value.length-1);
        }

        if(bill.value == " "){
            let tipAmount = 0
            let total = 0
    
            result[0].innerHTML = tipAmount.toFixed(2);
            result[1].innerHTML = total.toFixed(2);
        }
    
    billValue = parseFloat(bill.value)
    // console.log(billValue);
    calculateTip();
}

function handleClick(event){
    tipBtns.forEach(btn =>{
        // removes active state
        btn.classList.remove('btn-active');
        
        if (event.target.innerHTML == btn.innerHTML){
            btn.classList.add('btn-active');
            tipValue = parseFloat(btn.innerHTML)/100;
        }
    
    });
    tipCustom.value = "";
    calculateTip();
}



function setCustTipValue(){
    if(!validateInt(tipCustom.value)){
        tipCustom.value = tipCustom.value.substring(0,tipCustom.value.length-1)
    }
     tipValue = parseFloat(tipCustom.value/100);
    //  console.log(tipValue);
    
    tipBtns.forEach(btn =>{
        // removes active state
        btn.classList.remove('btn-active')
});

    if(tipCustom.value !== ""){
        calculateTip();
    }
}

function setPeopleValue(){
    if(!validateInt(people.value)){
        people.value = people.value.substring(0,people.value.length-1)
    }
     peopleValue = parseFloat(people.value); 
     
     if(peopleValue <= 0){
         errmsg.classList.add('show-error-msg');
        }setTimeout(function(){
            errmsg.classList.remove('show-error-msg');
        }, 3000);
        
        // console.log(peopleValue);
        calculateTip();
}

function calculateTip(){
    if(peopleValue >= 1){
        let tipAmount = billValue * tipValue / peopleValue;
        let total = billValue * (tipValue + 1 ) / peopleValue;

        result[0].innerHTML = tipAmount.toFixed(2);
        result[1].innerHTML = total.toFixed(2);

    }
    // if(billValue === " "){
    //     let tipAmount = "0"
    //     let total = "0"

    //     result[0].innerHTML = tipAmount.toFixed(2);
    //     result[1].innerHTML = total.toFixed(2);
    // }

}

function reset(){
    people.value = "1";
    setPeopleValue();

    tipBtns[2].click();
    
    bill.value = "0.0";
    setBillValue();

}


