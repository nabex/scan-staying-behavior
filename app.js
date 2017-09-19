var noble = require('noble');
var fs = require('fs');


var consoleDataOutput = fs.createWriteStream('./output.txt');


noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral) {

  console.log('Address', peripheral._noble.address);

  console.dir(peripheral, {depth: null, colors: true});

  console.log()

  consoleDataOutput.write(peripheral + '\n');

});
