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
      .addToUi();
}

function mySheetName() {
  return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getName();
}

function myCellName() {
  return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getActiveCell().getA1Notation();
}

var sheet = mySheetName();
var cell = myCellName();

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

/** geckoPrice
 * Shows price of cryptocurrency in selected fiat currency. 
 * For example:
 *   =geckoPrice("BTC", "USD")
 * @param {cryptocurrency}  eg. btc
 * @param {fiat currency}   eg. usd
 * @customfunction
 **/

function geckoPrice(id,currency) {
  var url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=' + encodeURI(currency) + '&ids='+ encodeURI(id) + '&order=market_cap_desc&per_page=100&page=1&sparkline=false';
  var json = getCoinGeckoData(url);
  if (json[0] === "Error:") {
    // deal with error with fetch operation
    return(url);
  }
  else {
    if (json[0] !== 200) {
      var data = json[0]
      return data.current_price;
   }
  }
}

/** geckoMCap
 * Shows market cap of cryptocurrency in selected fiat currency. 
 * For example:
 *   =geckoMCap("BTC", "USD")
 * @param {cryptocurrency}  eg. btc
 * @param {fiat currency}   eg. usd
 * @customfunction
**/

function geckoMCap(id,currency) {
  var url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=' + encodeURI(currency) + '&ids='+ encodeURI(id) + '&order=market_cap_desc&per_page=100&page=1&sparkline=false';
  var json = getCoinGeckoData(url);
  if (json[0] === "Error:") {
    // deal with error with fetch operation
    return("ERROR!");
  }
  else {
    if (json[0] !== 200) {
      var data = json[0]
      return data.market_cap;
   }
  }
}

/** geckopriceChange24h
 * Shows 24h price change of cryptocurrency in selected fiat currency. 
 * For example:
 *   =geckoPriceChange24h("BTC", "USD")
 * @param {cryptocurrency}  eg. btc
 * @param {fiat currency}   eg. usd
 * @customfunction
**/

function geckoPriceChange24h(id,currency) {
  var url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=' + encodeURI(currency) + '&ids='+ encodeURI(id) + '&order=market_cap_desc&per_page=100&page=1&sparkline=false';
  var json = getCoinGeckoData(url);
  if (json[0] === "Error:") {
    // deal with error with fetch operation
    return("ERROR!");
  }
  else {
    if (json[0] !== 200) {
      var data = json[0]
      return data.price_change_24h;
   }
  }
}

/** geckoTotalVolume
 * Shows total volume of cryptocurrency in selected fiat currency. 
 * For example:
 *   =geckoPriceChange24h("BTC", "USD")
 * @param {cryptocurrency}  eg. btc
 * @param {fiat currency}   eg. usd
 * @customfunction
**/

function geckoTotalVolume(id,currency) {
  var url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=' + encodeURI(currency) + '&ids='+ encodeURI(id) + '&order=market_cap_desc&per_page=100&page=1&sparkline=false';
  var json = getCoinGeckoData(url);
  if (json[0] === "Error:") {
    // deal with error with fetch operation
    return("ERROR!");
  }
  else {
    if (json[0] !== 200) {
      var data = json[0]
      return data.total_volume;
   }
  }
}

/** geckoFDV
 * Shows fully diluted valuation of cryptocurrency in selected fiat currency. 
 * For example:
 *   =geckoFDV("BTC", "USD")
 * @param {cryptocurrency}  eg. btc
 * @param {fiat currency}   eg. usd
 * @customfunction
**/

function geckoFDV(id,currency) {
  var url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=' + encodeURI(currency) + '&ids='+ encodeURI(id) + '&order=market_cap_desc&per_page=100&page=1&sparkline=false';
  var json = getCoinGeckoData(url);
  if (json[0] === "Error:") {
    // deal with error with fetch operation
    return("ERROR!");
  }
  else {
    if (json[0] !== 200) {
      var data = json[0]
      return data.fully_diluted_valuation;
   }
  }
}

/** geckoCircSupply
 * Shows circulation supply of cryptocurrency in selected fiat currency. 
 * For example:
 *   =geckoCircSupply("BTC", "USD")
 * @param {cryptocurrency}  eg. btc
 * @param {fiat currency}   eg. usd
 * @customfunction
**/

function geckoCircSupply(id,currency) {
  var url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=' + encodeURI(currency) + '&ids='+ encodeURI(id) + '&order=market_cap_desc&per_page=100&page=1&sparkline=false';
  var json = getCoinGeckoData(url);
  if (json[0] === "Error:") {
    // deal with error with fetch operation
    return("ERROR!");
  }
  else {
    if (json[0] !== 200) {
      var data = json[0]
      return data.circulating_supply;
   }
  }
}

/** geckoMaxSupply
 * Shows maimum supply of cryptocurrency in selected fiat currency. 
 * For example:
 *   =geckoMaxSupply("BTC", "USD")
 * @param {cryptocurrency}  eg. btc
 * @param {fiat currency}   eg. usd
 * @customfunction
**/

function geckoMaxSupply(id,currency) {
  var url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=' + encodeURI(currency) + '&ids='+ encodeURI(id) + '&order=market_cap_desc&per_page=100&page=1&sparkline=false';
  var json = getCoinGeckoData(url);
  if (json[0] === "Error:") {
    // deal with error with fetch operation
    return("ERROR!");
  }
  else {
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
    return("ERROR!");
  }
  else {
    if (json !== 200) {
      var data = json
      return data.trade_volume_24h_btc;
   }
  }
}

function geckoAllMetrics(id,currency) {
  id = "bitcoin";
  currency = "usd";
  var url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=' + encodeURI(currency) + '&ids='+ encodeURI(id) + '&order=market_cap_desc&per_page=100&page=1&sparkline=false';
  var json = getCoinGeckoData(url);
  if (json[0] === "Error:") {
    // deal with error with fetch operation
    return("ERROR!");
  }
  else {
    if (json[0] !== 200) {
      var data = json[0]
      Browser.msgBox(Object.entries(data));
   }
  }
}

function geckoAllCoins(){
  Browser.msgBox(cell);
}


function getCoinGeckoData(url) { 
  try {
    var response = UrlFetchApp.fetch(url);
    var responseData = response.getContentText();
    var json = JSON.parse(responseData);
    return json;
  }
  catch (e) {
    Logger.log(e);
    return ["Error:", e];
  }
}
