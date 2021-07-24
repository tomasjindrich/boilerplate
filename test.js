var appRoot = require('app-root-path');
var Settings = require(appRoot + '/modules/statica/classes/settingsClass.js');
var Page = require(appRoot + '/modules/statica/classes/pageClass.js');
var Data = require(appRoot + '/modules/statica/classes/dataClass.js');
var Dummy = require(appRoot + '/modules/statica/classes/dummyClass.js');

var { get, getAttachedFile, isDev, getListOfPages, getFile } = require(appRoot + '/modules/statica/tools/tools.js');

var settings = new Settings();
var page = new Page();
var data = new Data('src/data/products.js');
var dummy = new Dummy();



console.log(data.random('categories'));

