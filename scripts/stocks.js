class StocksHandler {
    factory(ciudad) {
        return new Meteo(ciudad);
    }

    load() {
        meteoLocalized.cargarDatos($("#stocksDisplay"));
    }
}

var mf = new MeteoFactory();
