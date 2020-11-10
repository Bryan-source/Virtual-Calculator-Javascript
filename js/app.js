function reduceSizeBtn (element){
    var v = element.id;
    if (v == "1" || v == "2" || v == "3" || v == "0" || v == "punto" || v == "igual") {
        element.style.width = "28%";
        element.style.height = "62px";
    } else if (v == "mas") {
        element.style.width = "89%";
        element.style.height = "99%";
    } else {
        element.style.width = "21%";
        element.style.height = "61.91";
    }  
}

function increaseSizeBtn (element){
    var v = element.id;
    if (v == "1" || v == "2" || v == "3" || v == "0" || v == "punto" || v == "igual") {
        element.style.width = "29%";
        element.style.height = "62.91px";
    } else if (v == "mas") {
        element.style.width = "90%";
        element.style.height = "100%";
    } else {
        element.style.width = "22%";
        element.style.height = "62.91";
    }
}


var Calculator = {
    display: document.getElementById("display"),
    valueDisplay: "0", 
    isNegative: false,
    operation: 0,
    num1: 0,
    num2: 0,
    answer: false,
    
    init: function (){
        this.assignEventButtons("tecla");
        this.assignEventShow();
    },

    assignEventButtons: function(selector){
        var buttons = document.getElementsByClassName(selector);
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].onmousedown = this.eventSizeButton;
          buttons[i].onmouseup = this.eventReturnSizeButton;
        }
    },

    assignEventShow: function(){
        document.getElementById("0").addEventListener("click", function() {Calculator.assignValue("0");});
        document.getElementById("1").addEventListener("click", function() {Calculator.assignValue("1");});
        document.getElementById("2").addEventListener("click", function() {Calculator.assignValue("2");});
        document.getElementById("3").addEventListener("click", function() {Calculator.assignValue("3");});
        document.getElementById("4").addEventListener("click", function() {Calculator.assignValue("4");});
        document.getElementById("5").addEventListener("click", function() {Calculator.assignValue("5");});
        document.getElementById("6").addEventListener("click", function() {Calculator.assignValue("6");});
        document.getElementById("7").addEventListener("click", function() {Calculator.assignValue("7");});
        document.getElementById("8").addEventListener("click", function() {Calculator.assignValue("8");});
        document.getElementById("9").addEventListener("click", function() {Calculator.assignValue("9");});

        document.getElementById("mas").addEventListener("click", function() {Calculator.assignOperation(1);});
        document.getElementById("menos").addEventListener("click", function() {Calculator.assignOperation(2);});
        document.getElementById("por").addEventListener("click", function() {Calculator.assignOperation(3);});
        document.getElementById("dividido").addEventListener("click", function() {Calculator.assignOperation(4);});
        document.getElementById("raiz").addEventListener("click", function() {Calculator.assignOperation(5);});

        document.getElementById("igual").addEventListener("click", function() {Calculator.assignAnswer();});

        document.getElementById("punto").addEventListener("click", function() {Calculator.assignPoint();});
        document.getElementById("sign").addEventListener("click", function() {Calculator.assignSign();});
        document.getElementById("on").addEventListener("click", function() {Calculator.cleanDisplay();});
    },

    assignAnswer: function(){
        Calculator.answer = true;
        Calculator.num2 = parseFloat(this.valueDisplay);
        switch(this.operation){
            case 1:
                var sum = (this.num1*10 + this.num2*10)/10;
                Calculator.valueDisplay = sum ;
                this.update();
                break;
            case 2:
                var subt =  (this.num1*10 - this.num2*10)/10;
                Calculator.valueDisplay = subt;
                this.update(); 
                break;
            case 3:
                var mult = ((this.num1*10) * (this.num2*10))/100;;
                Calculator.valueDisplay = mult.toFixed(2);
                this.update(); 
                break;
            case 4:
                var division = this.num1 / this.num2;
                Calculator.valueDisplay = division.toFixed(2);
                this.update(); 
                break;   
        }
    },   
    assignValue: function(num){
        if (this.valueDisplay.length < 8){
            if (this.valueDisplay == "0"){

                Calculator.valueDisplay = "";
                this.valueDisplay += num;
            }
            else{
                this.valueDisplay += num;
            }
            this.update();
        }

        if (this.answer || this.operation == 5){
            this.cleanDisplay();
            Calculator.valueDisplay = "";
            this.valueDisplay += num;
            this.update();
        }
        /* if (typeof this.valueDisplay == "number"){
            this.cleanDisplay();
            Calculator.valueDisplay = "";
            this.valueDisplay += num;
            this.update();
        } */
    },

    assignOperation: function(op){
        Calculator.num1 = parseFloat(this.valueDisplay); 
        this.cleanDisplay();
        this.display.innerHTML = "";
        Calculator.operation = op;
        //Sqrt
        if (op == 5){
            var sqr = Math.sqrt(this.num1);
            Calculator.valueDisplay = sqr.toFixed(2);
            this.update();    
        }
    },

    assignSign: function(){
        if (Calculator.valueDisplay != "0"){
            Calculator.isNegative = !Calculator.isNegative;
            if (Calculator.isNegative){
                Calculator.valueDisplay = "-" + Calculator.valueDisplay;
            }else{
                Calculator.valueDisplay = Calculator.valueDisplay.slice(1);
            }
            this.update();
        }
        
    },
    assignPoint: function(){
        if (this.valueDisplay.indexOf(".") == -1){
            if (this.valueDisplay == ""){
                this.valueDisplay += "0.";
            }else{
                this.valueDisplay += ".";
            }
            this.update();
        }
    },
    cleanDisplay: function(){
        this.display.innerHTML = "";
        Calculator.valueDisplay = "0";
        Calculator.operation = 0;
        Calculator.answer = false;
        Calculator.isNegative = false;
        this.update();
    },

    update: function(){
        
        if (this.valueDisplay > 999e4){
            this.display.innerHTML = this.valueDisplay.toExponential(4);
        }else{
            this.display.innerHTML = this.valueDisplay;
        }
        
        console.log(this.valueDisplay.length);
        
    },

    eventSizeButton: function(event){
        reduceSizeBtn(event.target);
    },

    eventReturnSizeButton: function(event){
        increaseSizeBtn(event.target);
    },

    //Print number


}

Calculator.init();