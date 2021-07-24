
var appRoot = require('app-root-path');
var fs = require('fs');


// Settings
var Settings = require(appRoot + '/modules/statica/classes/settingsClass.js');
var settings = new Settings();


// Test
function test () {
  return 'Hello traveler! Answer is 42.'
}

function getFileObject(pathToSource) {
  return require(appRoot + '/' + pathToSource);
}

function getDirFiles(dirPath) {
  return files = fs.readdirSync(appRoot + '/' + dirPath);
}


function getListOfPages() {
  var arr = getDirFiles('src/pages/');
  return arr.map(function(x){return x.replace('.pug', '.html');});
}

// If is Val Function Then return True
function isFunc (val) {
  return (typeof val === 'function') ? true : false
}

// Zkrátí řetězec na daný počet znaků, zachová na konci celé slovo
function trim(string, max) {
  return string.replace(new RegExp("^(.{"+max+"}[^\s]*).*"), "$1")
}

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}


/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return mergeDeep(target, ...sources);
}


// Celé náhodné číslo v rozmezí min - max
function randomNum( min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}


// Zaokrouhlení na desítky, stovky atd (10, 100)
function round(num, round) {
  return Math.round(num / round) * round
}


// Náhodná položka pole
function randomItem(array) {
  return array ? array[ randomNum(1, array.length) - 1 ] : null;
}


// Zkrátí řetězec na daný počet znaků, zachová na konci celé slovo
function trim(string, max) {
  return string.replace(new RegExp("^(.{"+max+"}[^\s]*).*"), "$1")
}


// propability: procentualni pravdepodobnost že vrátí true
function fortune(propability = 100) {
  var numbers = Math.ceil(100/propability);
  var choice = randomNum(1,numbers)
  var draw = randomNum(1, numbers)
  // console.log(choice +' / ' + draw + ' (' + numbers + ') ' + (choice == draw ? true : false));
  return choice == draw ? true : false
}

// Framework Path
function isDev () {
  return process.env.NODE_ENV == "development" ? true : false
}

function get(obj) {
  if (obj) 
    return (typeof obj === 'function') ? obj() : obj
  else return null
}

// Vezme položku objektu a vrátí (pokud existuje) jako objekt nebo funkci
function getVal(key, object) {
  if (settings[object][key]) 
    return (typeof settings[object][key] === 'function') ? settings[object][key]() : settings[object][key]
  else return null
}


function path (key, object = 'path') {
  return (key && object) ? getVal(key, object) : null
}

function build (key, object = 'build') {
  return (key && object) ? getVal(key, object) : null
}

function conf (key, object = 'config') {
  return (key && object) ? getVal(key, object) : null
}

function site (key, object = 'site') {
  return (key && object) ? getVal(key, object) : null
}

function page (key, object = 'page') {
  return (key && object) ? getVal(key, object) : null
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




module.exports = {

  test,
  isFunc,
  isObject,
  mergeDeep,
  randomNum,
  round,
  randomItem,
  trim,
  fortune,
  getListOfPages,
  getDirFiles,
  getFileObject,

  isDev,
  get,
  path,
  site,
  conf,
  page,
  getPermalink,
  getAttachedFile,
}