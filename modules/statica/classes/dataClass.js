var appRoot = require('app-root-path');
var Settings = require(appRoot + '/modules/statica/classes/settingsClass.js');
var { randomNum, getFileObject } = require(appRoot + '/modules/statica/tools/tools.js');

var settings = new Settings();

module.exports = class Data {
  constructor(pathToSource) {
    this.values = getFileObject(pathToSource);
  }

  list(key) {
    return this.values[key]
  }

  random(listKey) {
    // pokud náhodně vybírám z více rozměrného pole, udělej z tohoto pole flat
    var array = this.values[listKey];
    array = array.flat(Infinity);
    return array[randomNum(0, array.length - 1 )]
  }

}
