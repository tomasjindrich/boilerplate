var { settings, path, conf, site, page } = require('../core/settings.js');
var dummyFile = require('../../dummy/dummy.js');

// Test
function test () {
  return 'Hello traveler! Answer is 42.'
}

// Framework Path
function isDev () {
  return process.env.NODE_ENV == "development" ? true : false
}

// If is Val Function Then return True
function isFunc (val) {
  return (typeof val === 'function') ? true : false
}

function resolveNiceUrls () {
  // ignoruj config.nice_urls pokud...
  // je host_dev prázdný a env je development
  if (!conf('host_dev') && isDev()) return false;
  else return conf('nice_urls');
}

// Skládá cestu/url ke stránkám a souborům
function pathAssemble( path_before, base_before, base, base_after, path_after ) {
  // path_before + [ base_before + BASE + base_after ] + path_after
  var path = "";
  if (path_before) path += path_before; // https://www.tomasjindrich.cz/wp-content/plugins/wpt/
  if (base_before) path += base_before; // prefix-
  if (base)        path += base;        // nazev-souboru
  if (base_after)  path += base_after;  // .html
  if (path_after)  path += path_after;  // ?v3.2
  //- return path;
  return path;
};

// Generuje url ke stránkám/odkazům
function getPermalink(base_input) {

  // path_before + [ base_before + BASE + base_after ] + path_after
  var path_before = conf('host');
  var base_before = false;
  var base = base_input;
  var base_after = resolveNiceUrls(conf('nice_urls')) ? '/' : conf('page_link_ext');
  var path_after = null;

  return pathAssemble( path_before, base_before, base, base_after, path_after );
}

// generuje cestu/url k souborům (img, css, js atd...)
function getAttachedFile(base_input, version) {
  // path_before + [ base_before + BASE + base_after ] + path_after
  var path_before = conf('host');
  var base_before = "";
  var base = base_input;
  var base_after = "";
  var path_after = version;

  if (conf('file_path_before')) {
    path_before += conf('file_path_before'); 
  };

  return pathAssemble( path_before, base_before, base, base_after, path_after );
};



/**
 * format(n, x, s, c)
 * 
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 */

Number.prototype.format = function(n = 0, x = 3, s = ' ', c = ',') {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
      val = this.toFixed(Math.max(0, ~~n));
  return (c ? val.replace('.', c) : val).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

// class Block {
//   constructor (args = {
//     context: '',

//     }){


// } 

// Generate random fake data
class Dummy {

  constructor (args = {
    baseMin: conf('data_price_random_min'),
    baseMax: conf('data_price_random_max'),
    roundVal: conf('data_price_round'),
    decimal: conf('data_price_decimal'),
    }){

    this.vatSize = 21,
    this.vatRatio = 0.1736,
    this.vatAppend = ' %',
    this.descriptionMaxLength = 10,
      
      // base je cena S DPH
    this.decimal = conf('data_price_decimal'),
    this.roundVal = args.roundVal,
    this.baseMin = args.baseMin,
    this.baseMax = args.baseMax,
    this.base = this.round(this.randomNum()),
    this.priceAppend = conf('data_price_append'),
    this.vat = (this.base * this.vatRatio).toFixed()

    // context
    this.blockListDefault = {
      title: 'dekos',
      description: 'lorem80',
    }

  }


  randomNum( min = this.baseMin, max = this.baseMax ) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * randomText(context, list, source)
   * 
   * @param integer context : 
   * @param object  list    : 
   * @param object  source  : 
   */
  randomText(context, list = this.blockListDefault[context], source = dummyFile) {
    return list ? source[list][this.randomNum(1,source[list].length)-1] : '! chybí dummy zdroj';
  }

  getList(listObject, source = dummyFile) {
    return listObject ? source[listObject] : '! chybí dummy zdroj';
  }

  trim(string, max) {
    return string.replace(new RegExp("^(.{"+max+"}[^\s]*).*"), "$1")
  }

  round(num, round = this.roundVal) {
    return Math.round(num / round) * round
  }

  // propability: procentualni pravdepodobnost že vrátí true
  fortune(propability = 100) {
    var numbers = Math.ceil(100/propability);
    var choice = this.randomNum(1,numbers)
    var draw = this.randomNum(1, numbers)
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

class Repeater {
  constructor () {
    this.counter = 0
  }
  
  up() {
    this.counter++
  }

  
}

// class Block {
//   constructor() {
//       this.title = dummy.randomText('title'),
//       this.description = dummy.randomText('description'),
//       this.img.src = "https://via.placeholder.com/500x500"
//   }
// }


module.exports = {
  test,
  isDev,
  isFunc,
  getPermalink,
  getAttachedFile,
  Dummy,
  Repeater
}













  
//   
// };

// // generuje cestu/url k souborům (img, css, js atd...)
// function get_attached_file(base_input, version) {
//   // path_before + [ base_before + BASE + base_after ] + path_after
//   var path_before = conf('host');
//   var base_before = "";
//   var base = base_input;
//   var base_after = "";
//   var path_after = version;

//   if (conf('file_path_before')) {
//     path_before += conf('file_path_before'); 
//   };

//   return path_assemble( path_before, base_before, base, base_after, path_after );
// };


// // Seznam souborů z daného adresáře
// function get_filenames(folder_path) {
//   const fs = require('fs');
//   var files = fs.readdirSync(settings.path.project + folder_path);
//   return files;
// }


// function get_file_content(path_to_file) {

//   const fs = require('fs');
//   const path = require("path");
//   var file = fs.readFileSync(path.resolve(__dirname, path_to_file));
    
//   return file;
// }
// function active_menu_class(group) {
//   return group == page('group') ? conf('active_menu_item_class') : ''
// }

