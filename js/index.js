let buttons = document.getElementsByClassName('btn');
buttons = Array.from(buttons);
for (let button of buttons){
    try{
        button.addEventListener('click', calculate);
    }
    catch (e){

    }
}

function ifEmptyAddZero(equation){
    if (equation.length === 0){
        equation += '0';
    }
    return equation;
}

function isValidOperation(equation){
    let lastChar = equation.charAt(equation.length-1);
    return lastChar !== '+' && lastChar !== '-' && lastChar !== '/' && lastChar !== '*';
}

let canPlaceDot = true;
let prevEqual = false;
function calculate(event){
    let className = this.getAttribute('class').split(" ")[1];

    if (className !== "equal" && prevEqual){
        document.getElementsByClassName('operation-eq')[0].innerText = "";
        document.getElementsByClassName('answer')[0].innerText = "";
    }

    let equation = document.getElementsByClassName('operation-eq')[0].value;
    // equation = equation.replace("^", "**");
    equation = equation.replace("x", "*");

    if (className === 'clear'){
        canPlaceDot = true;
        equation = "";
        document.getElementsByClassName('answer')[0].innerText = equation;
        prevEqual = false;
    }

    else if (className === 'backspace'){
        canPlaceDot = true;
        prevEqual = false;
        equation = equation.substring(0, equation.length-1);
        if (equation.length === 0){
            document.getElementsByClassName('answer')[0].innerText = equation;
        }
        else if (isValidOperation(equation)){
            document.getElementsByClassName('answer')[0].innerText = eval(equation);
        }
        else{
            let dummy = equation.substring(0, equation.length-1);
            if (dummy.length === 0){
                document.getElementsByClassName('answer')[0].innerText = "";
            }
            else {
                document.getElementsByClassName('answer')[0].innerText = eval(dummy);
            }
        }
    }

    else if (className === 'add'){
        prevEqual = false;
        canPlaceDot = true;
        equation = ifEmptyAddZero(equation);
        if (isValidOperation(equation)) {
            equation += '+';
        }
        else{
            equation = equation.replace(/.$/, "+");
        }
    }

    else if (className === 'subtract'){
        prevEqual = false;
        canPlaceDot = true;
        equation = ifEmptyAddZero(equation);
        if (isValidOperation(equation)) {
            equation += '-';
        }
        else{
            equation = equation.replace(/.$/, "-");
        }
    }

    else if (className === 'multiply'){
        prevEqual = false;
        canPlaceDot = true;
        equation = ifEmptyAddZero(equation);
        if (isValidOperation(equation)) {
            equation += '*';
        }
        else{
            equation = equation.replace(/.$/, "*");
        }
    }

    else if (className === 'divide'){
        prevEqual = false;
        canPlaceDot = true;
        equation = ifEmptyAddZero(equation);
        if (isValidOperation(equation)) {
            equation += '/';
        }
        else{
            equation = equation.replace(/.$/, "/");
        }
    }

    else if (className.startsWith('btn-')){
        prevEqual = false;
        if (equation === '0'){
            equation = className.charAt(className.length - 1);
        }
        else if (!((equation.length >= 2 && (equation.endsWith('+0') || equation.endsWith('-0') || equation.endsWith('*0') || equation.endsWith('/0'))))){
            equation += className.charAt(className.length - 1);
            document.getElementsByClassName('answer')[0].innerText = eval(equation);
        }
    }

    else if (className === 'point'){
        prevEqual = false;
        if (equation.length === 0 || ! isValidOperation(equation)){
            canPlaceDot = false;
            equation += '0.';
            document.getElementsByClassName('answer')[0].innerText = eval(equation);
        }
        else if(equation.charAt(equation.length-1) !== '.' && canPlaceDot){
            canPlaceDot = false;
            equation += '.';
        }
    }

    else if (className === 'percent'){
        prevEqual = false;
        let temp = equation;
        if (!isValidOperation(equation)){
            return;
        }
        let flag = true;
        for(let i=temp.length -1; i>=0; i--){
            if (temp.charAt(i) === '+' || temp.charAt(i) === '-'){
                flag = false;
                let dummy = temp.substring(0, i);
                let percent = temp.substring(i+1,);
                let ans = Number(eval(dummy));
                equation = dummy + temp.charAt(i) + String(ans/100 * Number(percent));
                if (String(ans/100 * Number(percent)).includes('.')){
                    canPlaceDot = false;
                }
                document.getElementsByClassName('answer')[0].innerText = eval(equation);
                // console.log(dummy, percent, ans, equation);
                break;
            }
            else if (temp.charAt(i) === '*' || temp.charAt(i) === '/'){
                flag = false;
                let dummy = temp.substring(0, i);
                let percent = temp.substring(i+1,);
                equation = dummy + temp.charAt(i) + String(Number(percent)/100);
                if (String(Number(percent)/100).includes('.')){
                    canPlaceDot = false;
                }
                document.getElementsByClassName('answer')[0].innerText = eval(equation);
                // console.log(dummy, percent, equation);
                break;
            }
        }
        if (flag){
            equation = String(Number(temp)/100);
            document.getElementsByClassName('answer')[0].innerText = eval(equation);
        }
    }

    else if (className === "equal"){
        equation = ifEmptyAddZero(equation);
        canPlaceDot = true;
        prevEqual = true;
        if (! isValidOperation(equation)) {
            equation = equation.replace(/.$/, "");
        }
        let answer = eval(equation);
        document.getElementsByClassName('answer')[0].innerText = '= ' + answer;
    }

    equation = equation.replace("*", "x");
    document.getElementsByClassName('operation-eq')[0].innerText = equation;
}


