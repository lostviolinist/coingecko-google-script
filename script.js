function onOpen() {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('Function List')
        .addItem('geckoPrice', 'PriceExplain')
        .addItem('geckoMCap', 'McapExplain')
        .addItem('geckoPriceChange24h', 'PriceChangeExplain')
        .addItem('geckoTotalVolume', 'TotalVolumeExplain')
        .addItem('geckoFDV', 'FDVExplain')
        .addItem('geckoCircSupply', 'CircSupplyExplain')
        .addItem('geckoMaxSupply', 'MaxSupplyExplain')
        .addItem('geckoExchangeVolume24h', 'ExchangeVolumeExplain')
        .addItem('geckoAllCoins', 'ExchangeVolumeExplain')
        .addItem('geckoAllData', 'AllDataExplain')
        .addToUi();
}

function PriceExplain() {
    var ui = SpreadsheetApp.getUi()
    ui.alert("Get price of cryptocurrency in your selected currency",
        'Pass in cryptocurrency and currency like so: geckoPrice("bitcoin","usd"), or insert cell numbers',
        ui.ButtonSet.OK)
}

function McapExplain() {
    var ui = SpreadsheetApp.getUi()
    ui.alert("Get market cap of cryptocurrency in your selected currency",
        'Pass in cryptocurrency and currency like so: geckoMCap("bitcoin","usd"), or insert cell numbers',
        ui.ButtonSet.OK)
}

function PriceChangeExplain() {
    var ui = SpreadsheetApp.getUi()
    ui.alert("Get 24h price change of cryptocurrency in your selected currency",
        'Pass in cryptocurrency and currency like so: geckoPriceChange24h("bitcoin","usd"), or insert cell numbers',
        ui.ButtonSet.OK)
}

function TotalVolumeExplain() {
    var ui = SpreadsheetApp.getUi()
    ui.alert("Get total volume of cryptocurrency in your selected currency",
        'Pass in cryptocurrency and currency like so: geckoTotalVolume("bitcoin","usd"), or insert cell numbers',
        ui.ButtonSet.OK)
}

function FDVExplain() {
    var ui = SpreadsheetApp.getUi()
    ui.alert("Get fully diluted valuation of cryptocurrency in your selected currency",
        'Pass in cryptocurrency and currency like so: geckoFDV("bitcoin","usd"), or insert cell numbers',
        ui.ButtonSet.OK)
}

function CircSupplyExplain() {
    var ui = SpreadsheetApp.getUi()
    ui.alert("Get circulation supply of cryptocurrency in your selected currency",
        'Pass in cryptocurrency and currency like so: geckoCircSupply("bitcoin","usd"), or insert cell numbers',
        ui.ButtonSet.OK)
}

function MaxSupplyExplain() {
    var ui = SpreadsheetApp.getUi()
    ui.alert("Get max supply of cryptocurrency in your selected currency",
        'Pass in cryptocurrency and currency like so: geckoMaxSupply("bitcoin","usd"), or insert cell numbers',
        ui.ButtonSet.OK)
}

function ExchangeVolumeExplain() {
    var ui = SpreadsheetApp.getUi()
    ui.alert("Get 24h volume of your selected exchange in btc.",
        'Pass in exchange id like so: geckoExchangeVolume24h("binance"), or insert cell number',
        ui.ButtonSet.OK)
}

function AllCoinsExplain() {
    var ui = SpreadsheetApp.getUi()
    ui.alert("Get name and id of all coins on CoinGecko.",
        'Just type =geckoAllCoins()',
        ui.ButtonSet.OK)
}

function AllDataExplain() {
    var ui = SpreadsheetApp.getUi()
    ui.alert("Get data of all coins in your selected currency.",
        'Pass in exchange currency (and optional: page number) like so: geckoAllData("usd", "2"), or insert cell number',
        ui.ButtonSet.OK)
}

/** geckoPrice
 * Shows price of cryptocurrency in selected fiat currency. 
 * For example:
 *   =geckoPrice("bitcoin", "usd")
 * @param {cryptocurrency}  eg. bitcoin
 * @param {fiat currency}   eg. usd
 * @customfunction
 **/

function geckoPrice(id, currency) {
    var url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=' + encodeURI(currency) + '&ids=' + encodeURI(id) + '&order=market_cap_desc&per_page=100&page=1&sparkline=false';
    var json = getCoinGeckoData(url);
    if (json[0] === "Error:") {
        // deal with error with fetch operation
        return (url);
    } else {
        if (json[0] !== 200) {
            var data = json[0]
            return data.current_price;
        }
    }
}

/** geckoMCap
 * Shows market cap of cryptocurrency in selected fiat currency. 
 * For example:
 *   =geckoMCap("bitcoin", "usd")
 * @param {cryptocurrency}  eg. bitcoin
 * @param {fiat currency}   eg. usd
 * @customfunction
 **/

function geckoMCap(id, currency) {
    var url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=' + encodeURI(currency) + '&ids=' + encodeURI(id) + '&order=market_cap_desc&per_page=100&page=1&sparkline=false';
    var json = getCoinGeckoData(url);
    if (json[0] === "Error:") {
        // deal with error with fetch operation
        return ("ERROR!");
    } else {
        if (json[0] !== 200) {
            var data = json[0]
            return data.market_cap;
        }
    }
}

/** geckopriceChange24h
 * Shows 24h price change of cryptocurrency in selected fiat currency. 
 * For example:
 *   =geckoPriceChange24h("bitcoin", "usd")
 * @param {cryptocurrency}  eg. bitcoin
 * @param {fiat currency}   eg. usd
 * @customfunction
 **/

function geckoPriceChange24h(id, currency) {
    var url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=' + encodeURI(currency) + '&ids=' + encodeURI(id) + '&order=market_cap_desc&per_page=100&page=1&sparkline=false';
    var json = getCoinGeckoData(url);
    if (json[0] === "Error:") {
        // deal with error with fetch operation
        return ("ERROR!");
    } else {
        if (json[0] !== 200) {
            var data = json[0]
            return data.price_change_24h;
        }
    }
}

/** geckoTotalVolume
 * Shows total volume of cryptocurrency in selected fiat currency. 
 * For example:
 *   =geckoPriceChange24h("bitcoin", "usd")
 * @param {cryptocurrency}  eg. bitcoin
 * @param {fiat currency}   eg. usd
 * @customfunction
 **/

function geckoTotalVolume(id, currency) {
    var url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=' + encodeURI(currency) + '&ids=' + encodeURI(id) + '&order=market_cap_desc&per_page=100&page=1&sparkline=false';
    var json = getCoinGeckoData(url);
    if (json[0] === "Error:") {
        // deal with error with fetch operation
        return ("ERROR!");
    } else {
        if (json[0] !== 200) {
            var data = json[0]
            return data.total_volume;
        }
    }
}

/** geckoFDV
 * Shows fully diluted valuation of cryptocurrency in selected fiat currency. 
 * For example:
 *   =geckoFDV("bitcoin", "usd")
 * @param {cryptocurrency}  eg. bitcoin
 * @param {fiat currency}   eg. usd
 * @customfunction
 **/

function geckoFDV(id, currency) {
    var url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=' + encodeURI(currency) + '&ids=' + encodeURI(id) + '&order=market_cap_desc&per_page=100&page=1&sparkline=false';
    var json = getCoinGeckoData(url);
    if (json[0] === "Error:") {
        // deal with error with fetch operation
        return ("ERROR!");
    } else {
        if (json[0] !== 200) {
            var data = json[0]
            return data.fully_diluted_valuation;
        }
    }
}

/** geckoCircSupply
 * Shows circulation supply of cryptocurrency in selected fiat currency. 
 * For example:
 *   =geckoCircSupply("bitcoin", "usd")
 * @param {cryptocurrency}  eg. bitcoin
 * @param {fiat currency}   eg. usd
 * @customfunction
 **/

function geckoCircSupply(id, currency) {
    var url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=' + encodeURI(currency) + '&ids=' + encodeURI(id) + '&order=market_cap_desc&per_page=100&page=1&sparkline=false';
    var json = getCoinGeckoData(url);
    if (json[0] === "Error:") {
        // deal with error with fetch operation
        return ("ERROR!");
    } else {
        if (json[0] !== 200) {
            var data = json[0]
            return data.circulating_supply;
        }
    }
}

/** geckoMaxSupply
 * Shows maimum supply of cryptocurrency in selected fiat currency. 
 * For example:
 *   =geckoMaxSupply("bitcoin", "usd")
 * @param {cryptocurrency}  eg. bitcoin
 * @param {fiat currency}   eg. usd
 * @customfunction
 **/

function geckoMaxSupply(id, currency) {
    var url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=' + encodeURI(currency) + '&ids=' + encodeURI(id) + '&order=market_cap_desc&per_page=100&page=1&sparkline=false';
    var json = getCoinGeckoData(url);
    if (json[0] === "Error:") {
        // deal with error with fetch operation
        return ("ERROR!");
    } else {
        if (json[0] !== 200) {
            var data = json[0]
            return data.max_supply;
        }
    }
}

/** geckoExchangeVolume24h
 * Shows 24h trade volume of exchange in btc. 
 * For example:
 *   =geckoExchangeVolume24h("binance")
 * @param {exchange}  eg. binance
 * @customfunction
 **/

function geckoExchangeVolume24h(id) {
    var url = 'https://api.coingecko.com/api/v3/exchanges/' + encodeURI(id);
    var json = getCoinGeckoData(url);
    if (json[0] === "Error:") {
        // deal with error with fetch operation
        return ("ERROR!");
    } else {
        if (json !== 200) {
            var data = json
            return data.trade_volume_24h_btc;
        }
    }
}

/** geckoAllCoins
 * Shows all names and ids of coins available on coingecko. 
 * For example:
 *   =geckoAllCoins
 * @customfunction
 **/

function geckoAllCoins() {
    var url = 'https://api.coingecko.com/api/v3/coins/list';
    var response = getAllCoinGeckoData(url);
    var data = JSON.parse(response.getContentText());
    title = [{
        "id": "coin_id",
        "name": "coin_name"
    }];

    if (response[0] === "Error:") {
        // deal with error with fetch operation
        return ("ERROR!");
    } else {
        if (response[0] !== 200) {
            var element = new Array();
            element = data.map(function(e) {
                return [e.id, e.name];
            })
            var titles = new Array();
            titles = title.map(function(e) {
                return [e.id, e.name];
            })
        }
        return titles.concat(element);
    }
}

/** geckoAllData
 * Shows data of all coins in selected currency. 
 * For example:
 *   =geckoAllData("usd", "2")
 * @param {currency}  eg. usd
 * @param {page}  eg. 1-25
 * @customfunction
 **/

function geckoAllData(currency, page) {
    var page = (page + "") || "";
    if (page === "") {
        var url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=' + encodeURI(currency) + '&per_page=250';
    } else {
        var url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=' + encodeURI(currency) + '&per_page=250&page=' + encodeURI(page);
    }
    var response = getAllCoinGeckoData(url);
    var data = JSON.parse(response.getContentText());

    title = [{
        "id": "coin_id",
        "symbol": "coin_symbol",
        "name": "coin_name",
        "current_price": "coin_current_price",
        "market_cap": "coin_market_cap",
        "total_volume": "coin_total_volume",
        "high_24h": "coin_high_24h",
        "low_24h": "coin_low_24h",
        "price_change_24": "coin_price_change_24h"
    }];


    if (response[0] === "Error:") {
        // deal with error with fetch operation
        return ("ERROR!");
    } else {
        if (response[0] !== 200) {
            var element = new Array();
            element = data.map(function(e) {
                return [e.id, e.symbol, e.name, e.current_price, e.market_cap, e.total_volume, e.high_24h, e.low_24h, e.price_change_24h];
            })
            var titles = new Array();
            titles = title.map(function(e) {
                return [e.id, e.symbol, e.name, e.current_price, e.market_cap, e.total_volume, e.high_24h, e.low_24h, e.price_change_24];
            })
        }
        return titles.concat(element);
    }
}

function getAllCoinGeckoData(url) {
    try {
        var response = UrlFetchApp.fetch(url, {
            muteHttpExceptions: true,
            validateHttpsCertificates: true
        })
        return response;
    } catch (e) {
        Logger.log(e);
        return ["Error:", e];
    }
}

function getCoinGeckoData(url) {
    try {
        var response = UrlFetchApp.fetch(url);
        var responseData = response.getContentText();
        var json = JSON.parse(responseData);
        return json;
    } catch (e) {
        Logger.log(e);
        return ["Error:", e];
    }
}
