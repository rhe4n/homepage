"use strict"
class CalculadoraRPN {
    constructor() {
        this.stack = new Array();
        this.buffer = "";
    }

    updateDisplay() {
        this.borrarDisplay();
        for (var i = Math.max(0,this.stack.length-5); i < this.stack.length; i++) {
            this.addBlock(Number.parseFloat(this.stack[i]));
        }

        document.querySelector("input[type=\"text\"]").value = this.buffer;
    }

    addBlock(a) {
        var element = document.createElement("li");
        element.innerText = a;

        console.log(document.querySelector("body section form section ul"));
        if (document.querySelector("body section form section ul") === null) {
            var ul = document.createElement("ul");
            document.querySelector("body section form section").append(ul);
        }

        document.querySelector("body section form section ul").appendChild(element);
    }

    borrarDisplay() {
        if (document.querySelector("body section form section ul") !== null) {
            document.querySelector("body section form section ul").remove();
        }
        // var children = document.querySelector("body section form ul").children;
        // console.log(children.length)
        // while (children.length > 0) {
        //     children.item(0).remove();
        // }

        // document.querySelector("body section form ul").remove();
    }

    punto() {
        this.buffer += ".";
        this.updateDisplay();
    }

    digitos(n) {
        this.buffer += n;
        this.updateDisplay();
    }

    reset() {
        this.buffer = "";
        this.stack = new Array();
        this.updateDisplay();
    }

    delete() {
        this.stack.pop();
        this.updateDisplay();        
    }

    enter() {
        var maybe = Number.parseFloat(this.buffer);
        if (!Number.isNaN(maybe)) {
            this.stack.push(maybe);
        }
        this.buffer = "";
        this.updateDisplay();
    }

    suma() {
        var o1 = this.stack.pop();
        var o2 = this.stack.pop();
        this.stack.push(o1+o2);
        this.updateDisplay();
    }

    resta() {
        var o1 = this.stack.pop();
        console.log(o1)
        var o2 = this.stack.pop();
        console.log(o2)
        if (o2 == undefined) {
            o2 = 0;
        }
        this.stack.push(o2-o1);
        this.updateDisplay();
    }

    multiplicacion() {
        var o1 = this.stack.pop();
        var o2 = this.stack.pop();
        this.stack.push(o1*o2);
        this.updateDisplay();
    }

    division() {
        var o1 = this.stack.pop();
        
        var o2 = this.stack.pop();

        this.stack.push(o2/o1);
        this.updateDisplay();
    }

    sin() {
        this.stack.push(Math.sin(this.stack.pop()));
        this.updateDisplay();
    }

    cos() {
        this.stack.push(Math.cos(this.stack.pop()));
        this.updateDisplay();
    }

    tan() {
        this.stack.push(Math.tan(this.stack.pop()));
        this.updateDisplay();
    }

    arcSin() {
        this.stack.push(Math.asin(this.stack.pop()));
        this.updateDisplay();
    }

    arcCos() {
        this.stack.push(Math.acos(this.stack.pop()));
        this.updateDisplay();
    }

    arcTan() {
        this.stack.push(Math.atan(this.stack.pop()));
        this.updateDisplay();
    }


    eventoTeclaPulsada(event) {
        if (event.keyCode == 13) {
            this.enter();
            return;
        } else if (event.keyCode == 8) {
            this.delete();
        }

        switch(String.fromCharCode(event.keyCode)) {
            case "1":
                this.digitos(1);
                break;
            case "2":
                this.digitos(2);
                break;
            case "3":
                this.digitos(3);
                break;
            case "4":
                this.digitos(4);
                break;
            case "5":
                this.digitos(5);
                break;
            case "6":
                this.digitos(6);
                break;
            case "7":
                this.digitos(7);
                break;
            case "8":
                this.digitos(8);
                break;
            case "9":
                this.digitos(9);
                break;
            case "0":
                this.digitos(0);
                break;
            case ".":
                this.punto();
                break;
            case "r":
                this.reset();
                break;
            case "+":
                this.suma();
                break;
            case "-":
                this.resta();
                break;
            case "*":
                this.multiplicacion();
                break;
            case "/":
                this.division();
                break;
            case "s":
                this.sin();
                break;
            case "c":
                this.cos();
                break;
            case "t":
                this.tan();
                break;
            case "S":
                this.arcSin();
                break;
            case "C":
                this.arcCos();
                break;
            case "T":
                this.arcTan();
                break;
            case "e":
                this.enter();
                break;
            case "d":
                this.delete();
                break;
            
        }
    }

}

var c = new CalculadoraRPN();