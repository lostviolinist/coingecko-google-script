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
