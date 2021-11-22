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

        var lowest = getLowestIndex(valores);
        var strDatos = "";
        for (var i = 0; i < 24; i++) {
            var hora = putZeroBefore(i) + ":00";

            if (i == lowest) {
                strDatos += "<li id=\"lowestPrice\">" + hora + ": " + valores[i].value + " €/MWh</li>";
            } else {
                strDatos += "<li>" + hora + ": " + valores[i].value + " €/MWh</li>";
            }            
        }
        strDatos += "<li>Fecha: " + valores[0].datetime.substring(0,10) + "</li>";

        var elemento = document.createElement("ul");
        elemento.setAttribute("id", "list_hourly_price");
        elemento.innerHTML = strDatos;

        var where = $("#luzDisplay");
        where.empty();
        where.append(elemento);
        
        
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


var pl = new PrecioLuz();
window.addEventListener("onload", pl.cargarDatos());