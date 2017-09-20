var noble = require('noble');
var fs = require('fs');
var consoleDataOutput = fs.createWriteStream('./output.txt');



//現在時刻取得
function time() {
	var now = new Date();
	var hour = now.getHours();
	var min = now.getMinutes();
	var sec = now.getSeconds();
	//出力用
	var s = hour + ":" + min + ":" + sec;
	return s;
}


noble.on('stateChange', function(state) {
  if (state === 'poweredOn') noble.startScanning();
  else noble.stopScanning();
});



noble.on('discover', function(peripheral) {

  var scanData = {
    time    :time(),
    name    :peripheral.advertisement.localName,
    bd_addr :peripheral.address,
    uuid    :peripheral.uuid,
    txPower :peripheral.advertisement.txPowerLevel,
    rssi    :peripheral.rssi,
  }
  var scanDataToTxt = JSON.stringify(scanData);

  setInterval(function(){
    console.dir(scanData, {depth: null, colors: true});
    //output.txtにjson(Peripheral)書き込み
    consoleDataOutput.write(scanDataToTxt + '\n');
  }, 1000);

});
