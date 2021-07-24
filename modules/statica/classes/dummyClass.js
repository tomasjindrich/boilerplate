var appRoot = require('app-root-path');
var fs = require('fs');
var Settings = require(appRoot + '/modules/statica/classes/settingsClass.js');
var settings = new Settings();

var { randomNum, round, getDirFiles } = require(appRoot + '/modules/statica/tools/tools.js');

// Generate random fake data
module.exports = class Dummy {

  constructor (){

    // this.title = title(),

    this.vatSize = 21,
    this.vatRatio = 0.1736,
    this.vatAppend = ' %',
    this.descriptionMaxLength = 10,
      
    // base je cena S DPH
    this.decimal = settings.dummy.price.decimal,
    this.roundVal = settings.dummy.price.round,
    this.baseMin = settings.dummy.price.min,
    this.baseMax = settings.dummy.price.max,
    this.base = round(randomNum(this.baseMin, this.baseMax), this.roundVal),
    this.priceAppend = settings.dummy.price.append,
    this.vat = (this.base * this.vatRatio).toFixed()

    // context
    this.blockListDefault = {
      title: 'dekos',
      description: 'lorem80',
    }

  }

  // num - pokud chci vytáhnout určitý obrázek v pořadí, jinak náhodně = nechám prázdné
  img(subfolder = '', num, sourceDir = settings.dummy.image.sourceDir + subfolder) {
    var filenames = getDirFiles('dist/' + sourceDir)
    var filenum = num ? num : randomNum(1, filenames.length - 1)
    return sourceDir + filenames[filenum]
  }

  /**
   * randomText(context, list, source)
   * 
   * @param integer context : 
   * @param object  list    : 
   * @param object  source  : 
   */
  randomText(context, list = this.blockListDefault[context], source = dummyFile) {
    return list ? source[list][randomNum(1,source[list].length)-1] : '! chybí dummy zdroj';
  }

  getList(listObject, source = dummyFile) {
    return listObject ? source[listObject] : '! chybí dummy zdroj';
  }

  trim(string, max) {
    return string.replace(new RegExp("^(.{"+max+"}[^\s]*).*"), "$1")
  }

  // round(num, round = this.roundVal) {
  //   return Math.round(num / round) * round
  // }

  // propability: procentualni pravdepodobnost že vrátí true
  fortune(propability = 100) {
    var numbers = Math.ceil(100/propability);
    var choice = randomNum(1,numbers)
    var draw = randomNum(1, numbers)
    // console.log(choice +' / ' + draw + ' (' + numbers + ') ' + (choice == draw ? true : false));
    return choice == draw ? true : false
  }

  priceVat() {
    return this.base.format(this.decimal) + this.priceAppend
  }

  priceNoVat() {
    return (this.base - this.vat).format(this.decimal) + this.priceAppend
  }

  priceVatOnly() {
    return (this.vat).format(this.decimal) + this.priceAppend
  }

}