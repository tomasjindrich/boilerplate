var appRoot = require('app-root-path');
var Settings = require(appRoot + '/modules/statica/classes/settingsClass.js');
var settings = new Settings();

module.exports = class Page {

  constructor(title, args={}) {
    this.title = title ? () => title : settings.site.title,
    this.description = args.description ? () => args.description : settings.site.description,
    this.og = () => this.site.og
  }


}
