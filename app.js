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

  //console.log('Address', peripheral._noble.address);
  //console.dir(peripheral, {depth: null, colors: true});
  //console.log()
  var scanData = {
    time    :time(),
    name    :peripheral.advertisement.localName,
    bd_addr :peripheral.address,
    uuid    :peripheral.uuid,
    txPower :peripheral.advertisement.txPowerLevel,
    rssi    :peripheral.rssi,
  }

  setInterval(function(){
    //console.log(time()+ ","+ peripheral.address + "," + peripheral.uuid + "," + peripheral.rssi);
    console.dir(scanData, {depth: null, colors: true});
    //if(peripheral.address == "04:4b:ed:99:8f:8d") console.log("!!!!!!!!!!!!!!!!!");
    //console.log();
    //console.log('Address', peripheral._noble.address);
    //peripheral.updateRssi();
  }, 1000);

  //output.txtにjson(Peripheral)書き込み
  consoleDataOutput.write(peripheral + '\n');

});
