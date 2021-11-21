"use strict"
class PrecioLuz {
    //https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real?start_date=2021-11-20T00:00&end_date=2021-11-20T23:59&time_trunc=hour
    constructor() {
        this.url = "https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real?"
        
        this.setStartDate();
        this.setEndDate();
        this.setTrunc();
    }

    setStartDate() {
        var today = new Date();
        var str = "start_date=";
        str += today.getFullYear() + "-" + today.getMonth() + "-" + today.getDay();
        str += "T00:00&";

        this.url += str;
    }

    setEndDate() {
        var today = new Date();
        var str = "end_date=";
        str += today.getFullYear() + "-" + today.getMonth() + "-" + today.getDay();
        str += "T23:59&";

        this.url += str;
    }

    setTrunc() {
        this.url += "time_trunc=hour";
    }

    cargarDatos() {
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
        console.log(valores);


        var lowest = getLowestIndex(valores);

        var strDatos = "";
        for (var i = 0; i < 24; i++) {
            var hora = (i < 10 ? "0"+i : i) + ":00";

            if (i == lowest) {
                strDatos += "<li id=\"lowestPrice\">" + hora + ": " + valores[i].value + " €/MWh</li>";
            } else {
                strDatos += "<li>" + hora + ": " + valores[i].value + " €/MWh</li>";
            }            
        }

        var elemento = document.createElement("ul");
        elemento.setAttribute("id", "list_hourly_price");
        elemento.innerHTML = strDatos;

        var where = $("#luzDisplay");
        where.empty();
        where.append(elemento);
    }

    run() {
        this.cargarDatos();
    }
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


var pl = new PrecioLuz();
window.addEventListener("onload", pl.run());