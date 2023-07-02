class CryptoChecker {
    //{"id":"bitcoin","symbol":"btc","name":"Bitcoin"}
    //https://www.coingecko.com/es/api/documentation?

    setBtcEur() {
        this.id = "bitcoin";
        this.vs = "eur";
    }

    setEthBtc() {
        this.id = "ethereum";
        this.vs = "btc";
    }

    setAdaBtc() {
        this.id = "cardano";
        this.vs = "btc";
    }

    getUrl() {
        return "https://api.coingecko.com/api/v3/simple/price?ids="+this.id+"&vs_currencies="+this.vs;
    }

    updateAside() {
        $.ajax({
            dataType: 'json',
            url: new BtcEur().getUrl(),
            method: 'GET',
            success: new BtcEur().successAside,
            error: this.error
        });

        $.ajax({
            dataType: 'json',
            url: new EthBtc().getUrl(),
            method: 'GET',
            success: new EthBtc().successAside,
            error: this.error
        });

        $.ajax({
            dataType: 'json',
            url: new AdaBtc().getUrl(),
            method: 'GET',
            success: new AdaBtc().successAside,
            error: this.error
        });
    }

    error() {
        $("h2").val("error"); 
    }
}

class BtcEur {
    constructor() {
        this.id = "bitcoin";
        this.vs = "eur";
    }

    getUrl() {
        return "https://api.coingecko.com/api/v3/simple/price?ids="+this.id+"&vs_currencies="+this.vs;
    }

    successAside(datos) {
        var stringDatos = datos.bitcoin.eur;
                
        var elemento = document.createElement("p"); 
        elemento.innerHTML = "BTC/EUR   " + stringDatos;
        $("#pairOverview").append(elemento);
    }
}

class AdaBtc {
    constructor() {
        this.id = "cardano";
        this.vs = "btc";
    }

    getUrl() {
        return "https://api.coingecko.com/api/v3/simple/price?ids="+this.id+"&vs_currencies="+this.vs;
    }

    successAside(datos) {
        console.log(datos);
        var stringDatos = datos.cardano.btc;
                
        var elemento = document.createElement("p"); 
        elemento.innerHTML = "ADA/BTC   " + stringDatos;
        $("#pairOverview").append(elemento);
    }
}

class EthBtc {
    constructor() {
        this.id = "ethereum";
        this.vs = "btc";
    }

    getUrl() {
        return "https://api.coingecko.com/api/v3/simple/price?ids="+this.id+"&vs_currencies="+this.vs;
    }

    successAside(datos) {
        var stringDatos = datos.ethereum.btc;
                
        var elemento = document.createElement("p"); 
        elemento.innerHTML = "ETH/BTC   " + stringDatos;
        $("#pairOverview").append(elemento);
    }
}

window.addEventListener("onload", new CryptoChecker().updateAside());