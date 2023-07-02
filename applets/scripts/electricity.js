"use strict"
class PrecioLuz {
    //https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real?start_date=2021-11-20T00:00&end_date=2021-11-20T23:59&time_trunc=hour
    constructor() {        
        this.date = new Date();
    }

    reloadUrl() {
        this.url = "https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real?";

        var str = "start_date=";
        str += this.date.getFullYear() + "-" + putZeroBefore(this.date.getMonth()+1) + "-" + putZeroBefore(this.date.getDate());
        str += "T00:00&";
        this.url += str;


        var str2 = "end_date=";
        str2 += this.date.getFullYear() + "-" + putZeroBefore(this.date.getMonth()+1) + "-" + putZeroBefore(this.date.getDate());
        str2 += "T23:59&";
        this.url += str2;

        this.url += "time_trunc=hour";
    }

    yesterday() {
        this.date.setDate(this.date.getDate() - 1);
        this.reloadUrl();
        this.cargarDatos();
        console.log("fecha:" + this.date.toLocaleString());
    }

    tomorrow() {
        this.date.setDate(this.date.getDate() + 1);
        this.reloadUrl();
        this.cargarDatos();
        console.log("fecha:" + this.date.toLocaleString());
    }

    cargarDatos() {
        this.reloadUrl();
        this.updateFecha();

        console.log(this.url);

        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: this.mostrarDatos,
            error: function() {
                $("h1").html("error"); 
            }
        });
    }

    mostrarDatos(data) {
        var valores = data.included[0].attributes.values;
        var t1 = perc33(valores);
        var t2 = perc66(valores);
        var lowestIndex = getLowestIndex(valores);

        var ul = document.createElement("ul");
        ul.setAttribute("id", "list_hourly_price");
        var where = $("#luzDisplay");
        where.empty();
        where.append(ul);

        var li;
        for (var i = 0; i < 24; i++) {
            var hora = putZeroBefore(i) + ":00";
            
            li = document.createElement("li");
            if (i==lowestIndex) {
                li.setAttribute("id", "lowestPrice");
            }

            if (valores[i].value < t1) {
                li.setAttribute("class", "lowerThird");
            } else if (valores[i].value < t2) {
                li.setAttribute("class", "middleThird")
            } else {
                li.setAttribute("class", "highestThird")
            }

            li.innerText = hora +": " + valores[i].value + " €/MWh";
            ul.append(li);
        }
    }

    updateFecha() {
        var str = this.date.getFullYear() + "-" + putZeroBefore(this.date.getMonth()+1) + "-" + putZeroBefore(this.date.getDate());
        console.log(str);

        console.log("spinner: " + putZeroBefore(this.date.getDate()) + "/" + putZeroBefore(this.date.getMonth()));
        $("#dateDisplay").text(str);    
    }
}

function putZeroBefore(i) {
    return (i < 10 ? "0"+i : i);
}

function getLowestIndex(arr) {
    var lowest = 0;


    for (var i = 0; i < 24; i++) {
        if (arr[lowest].value > arr[i].value) {
            lowest = i;
        }
    }

    return lowest;
}

function perc33(arr) {
    var flag = -1;

    var values = new Array();
    arr.forEach(element => {
        values.push(element.value);
    });

    values.sort(function(a, b) {
        return a - b;
    });

    
    console.log(values);
    console.log("perc 33 = " + values[(values.length/3)])
    return values[values.length/3];
}

function perc66(arr) {
    var flag = -1;

    var values = new Array();
    arr.forEach(element => {
        values.push(element.value);
    });

    values.sort(function(a, b) {
        return a - b;
    });

    console.log(values);
    console.log("perc 66 = " + values[(values.length/3)*2])
    return values[(values.length/3)*2];
}


var pl = new PrecioLuz();
window.addEventListener("onload", pl.cargarDatos());