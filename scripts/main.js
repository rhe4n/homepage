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

var hp = new HomePage();