"use strict"
class HomePage {
    onLoad() {
        this.loadDate();
        this.loadTime();
    }

    loadDate() {
        var options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        var today = new Date();
        $(".date").text(today.toLocaleDateString("en-US", options));
    }

    loadTime() {
        var now = new Date();
        $(".time").text(now.toLocaleTimeString("es-ES").slice(0, -3));
    }
}

function loadNav() {
    document.write("<nav><a href=\"index.html\">Home</a><a href=\"weather.html\">Weather</a><a href=\"applets.html\">Applets</a><a href=\"tasks.html\">Tasks</a></nav>");
}

var hp = new HomePage();