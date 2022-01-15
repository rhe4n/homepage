"use strict"
class HomePage {
    onLoad() {
        this.loadDate();
        this.loadTime();
    }

    loadDate() {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        var today = new Date();
        $(".date").text(today.toLocaleDateString("en-US", options));
    }   
    
    loadTime() {
        var now = new Date();
        $(".time").text(now.toLocaleTimeString("es-ES").slice(0, -3));
    }    
}

function loadNav() {
    document.write("<nav><a href=\"index.html\" id=\"homenav\">Home</a><a href=\"applets.html\" id=\"appletsnav\">Applets</a><a href=\"tasks.html\" id=\"tasksnav\">Tasks</a></nav>");
}

function darkMode(checkbox) {
    var element = document.body;
    element.classList.toggle("darkMode");
}

var hp = new HomePage();