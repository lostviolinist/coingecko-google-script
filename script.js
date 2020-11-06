function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('My Custom Menu')
      .addItem('CoinGecko', 'getCoinGeckoData')
      .addToUi();
}

  Browser.msgBox("Opening function");
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Sheet2");
  var input = sheet.getRange(1,1).getValue();
  value = input.split('/');
  currency = value[0].toLowerCase();
  id = value[1].toLowerCase();
  var url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=' + encodeURI(currency) + '&ids='+ encodeURI(id) + '&order=market_cap_desc&per_page=100&page=1&sparkline=false';
  Browser.msgBox(url);
  var json = getCoinGeckoData(url);
  
  if (json[0] === "Error:") {
    // deal with error with fetch operation
    Browser.msgBox("Error");
  }
  else {
    if (json[0] !== 200) {
      // deal with error from api
      var data = json[0]
      
      // parse into array for Google Sheet
      var outputData = [
        ["id", data.id],
        ["current price", data.current_price],
        ["market cap", data.market_cap],
      ];
        Browser.msgBox(outputData);
        sheet.getRange(1,1,1,1).clearContent();
        sheet.getRange(1,1,3,2).setValues(outputData);
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
