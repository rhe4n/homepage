class MeteoFactory {
    factory(ciudad) {
        return new Meteo(ciudad);
    }

    load() {
        var meteoLocalized = this.factory($("#cityField").val());
        $("#cityField").val("");
        meteoLocalized.cargarDatos($("#weatherDisplay"));
    }
}


class Meteo {
    constructor(nuevaCiudad){
        this.apikey = "47fc7ef6afc78b7ae055c5cc8501ab5c";
        this.ciudad = nuevaCiudad;
        this.codigoPais;
        this.unidades = "&units=metric";
        this.idioma = "&lang=en";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + "," + this.codigoPais + this.unidades + this.idioma + "&APPID=" + this.apikey;
    }
    
    cargarDatos(where) {
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(datos) {
                    var stringDatos = "<h3>" + datos.name + "</h3>";
                    stringDatos += "<h4>" + datos.weather[0].description + "</h4>";
                    stringDatos += "<p>temperature: " + datos.main.temp + " ºC</p>";
                    stringDatos += "<p>humidity: " + datos.main.humidity + "%</p>";
                    stringDatos += "<p>sunrise at " + new Date(datos.sys.sunrise *1000).toLocaleTimeString() + "</p>";
                    stringDatos += "<p>sunset at " + new Date(datos.sys.sunset *1000).toLocaleTimeString() + "</p>";
                    stringDatos += "<p>wind going " + datos.wind.speed + " m/s</p>";
                    stringDatos += "<p>" + datos.clouds.all + "% cloudy</p>";
                    
                    var elemento = document.createElement("div");
                    elemento.setAttribute("id", "divsplay");
                    elemento.innerHTML = stringDatos;
                    
                    console.log(this.url);
                    console.log(datos);

                    where.empty();
                    where.append("<img class=\"icon\" src=\"https://openweathermap.org/img/w/"+datos.weather[0].icon+".png\" alt=\"icono\">");
                    where.append(elemento);
                },
            error:function() {
                $("h1").html("error"); 
            }
        });
    }
    
}

var mf = new MeteoFactory();
var input = document.getElementById("cityField");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    mf.load();
    //document.getElementById("enter").click();
  }
}); 
