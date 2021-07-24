var appRoot = require('app-root-path');
var defaultSettings = require(appRoot + '/modules/statica/defaultSettings.js');
var customSettings = require(appRoot + '/config/settings.js');

module.exports = class Settings {

  constructor() {

    // this.settings = customSettings ? () => Object.assign(defaultSettings, customSettings) : defaultSettings;
    this.settings = Object.assign(defaultSettings, customSettings);

    this.project = this.settings.project,

    this.site = {

      url: this.settings.site.url,
      name: this.settings.site.name,
      title: this.settings.site.title,
      description: this.settings.site.description,


      theme: {
        color: [
          {
            name: 'primary',
            hex: '#1c2536',
          },
          {
            name: 'secondary',
            hex: '#008800',
          },
        ],
      },


      og: {
        og_title: () => this.site.name, // Open Graph titulek, defaultně se dědí ze site.name
        og_description: () => this.site.description, // Open Graph popisek, defaultně se dědí ze site.description
        og_site_name: () => this.site.name, // Open Graph site_name, defaultně se dědí ze site.name
      },


      service: {
        ga: {
          name: 'Google Analytics',
          id: null,
        }
      }

    },

    this.loader = this.settings.loader,

    this.dummy = {
      price: {
        min: 100,
        max:  900,
        decimal: 0,
        round: 1,
        append: ' Kč'
      },
      image: {
        // relativně od /dist
        sourceDir: 'img/dummy/',
        limit: 10 
      }
    },

    // *  *  *  *  *


    this.config = {

      env: process.env.NODE_ENV,

      path: {
        dist: './dist',
        src: './src',
        tmp: './tmp',
        // relativně k dist/
        assets: {
          img: 'img',
          css: 'css',
          svg: 'svg',
          sprite: 'svg/sprites',
          js: 'js',
          favicon: 'favicon',
        },
        // přidá před cesty k souborům, např wp-content/plugins/wpt/
        prepend: false, 
      },


      server: {
        development: null,
        stage: null,
        production: () => this.site.url + '/',
      },

      router: {
        niceUrl: false
      },
      
      page_link_ext: '.html',
      page_file_ext: 'html',
      active_menu_item_class: 'menu-link-active',
      svg_sprite_default_file: 'sprite',


    },

    this.render = {
      head: {
        favicon: true,
        social: true,
      },
      moveOnTop: true,
      devTool: false,
      
    }

  }

  get host () { 
    if ( this.config.env == 'development' && this.config.server.development ) 
      return this.config.server.development;
    // pokud env == production && je nastavený server.production
    else if ( this.config.env == 'production' && this.config.server.production ) 
      return this.config.server.production
    else return null;
  }

  get show () {
    console.log(this.site);
    
  }
  
}


