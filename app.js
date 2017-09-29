/*
'use strict';

const noble = require('noble');
const knownDevices = [];


//現在時刻取得
function time() {
	var now = new Date();
	var hour = now.getHours();
	var min = now.getMinutes();
	var sec = now.getSeconds();
	//出力用
	var s = hour + "," + min + "," + sec;
	return s;
}



//discovered BLE device
const discovered = (peripheral) => {
    const device = {
        name		: peripheral.advertisement.localName,
				addr 		:	peripheral.address,
        uuid		: peripheral.uuid,
        rssi		: peripheral.rssi
    };
    knownDevices.push(device);
    console.log(`${knownDevices.length},NAME:${device.name},ADDR:${device.addr},UUID:${device.uuid},RSSI:${device.rssi}`);
}



//BLE scan start
const scanStart = () => {
	setInterval(function(){
    noble.startScanning();
    noble.on('discover', discovered);
		console.log("");
	},3000);
}




if(noble.state === 'poweredOn'){
    scanStart();
}else{
    noble.on('stateChange', scanStart);
}


*/










var noble = require('noble');
var fs = require('fs');
var consoleDataOutput = fs.createWriteStream('./output.json');
var knownDevices = [];

var targetUUID = "91af1f253cfb4d5bb89aac568935c516"; //NabePhoneUUID


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

	setInterval(function(){
		if (state === 'poweredOn'){
			noble.startScanning();
			console.log("");
		}else{
			noble.stopScanning();
		}
	}, 10000);
});


noble.on('discover', function(peripheral){

	var device = {
		time	:time(),
		name    :peripheral.advertisement.localName,
    bd_addr :peripheral.address,
    uuid    :peripheral.uuid,
    txPower :peripheral.advertisement.txPowerLevel,
    rssi    :peripheral.rssi,
	}
	knownDevices.push(device);
	var scanDataToTxt = JSON.stringify(device);

	console.log(`${knownDevices.length},NAME:${device.name},ADDR:${device.addr},UUID:${device.uuid},RSSI:${device.rssi}`);
	//console.log(scanData.name+","+scanData.uuid+","+);
	consoleDataOutput.write(scanDataToTxt + '\n');


});//noble.on('discover');



/*
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

  console.dir(scanData, {depth: null, colors: true});

  setInterval(function(){
    peripheral.updateRssi();
    //output.txtにjson(Peripheral)書き込み
    if(scanData.name == 'NabePhone'){
      consoleDataOutput.write(scanDataToTxt + '\n');
    }
  }, 1000);

});
*/
