
var appRoot = require('app-root-path');

// Statica Framework
var { getSettings, path, conf, site, page } = require('statica/core/settings.js');
var { getAttachedFile, getPermalink, Dummy, Repeater} =  require('statica/tools/tools.js');

// default + custom settings
var settings = getSettings( require(appRoot +'/settings.js') );

console.log(site('name'));
console.log(page('title_preset'));
