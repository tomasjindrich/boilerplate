var settings_default = {
  
  path: {

    dist : './dist',
    src  : './src',
    tmp  : './tmp',

    // paths relative to dist folder
    img     : 'img',
    css     : 'css',
    svg     : 'svg',
    sprite  : 'svg/sprites',
    js      : 'js',
    favicon : 'favicon',
  },

  build: {
    sitemap    : true,
    favicon    : false,
    img_resize : false,
  },

  config: {
    
    env : process.env.NODE_ENV,

    developer_name : 'Tomáš Jindřich',
    developer_url  : 'https://www.tomasjindrich.cz',

    // host_dev: null pokud jde o verzi s relativními cestami
    // nebo vzdálená https://projekt.vyvojovy-server.cz
    host_dev : null,
    
    // host_prod: veřejná ostrá verze např https://www.projekt.cz,
    // přebírá se z site.url
    host_prod : () => site('url') + '/',
    
    host: function() { 
      if ( conf('env') == 'development' && conf('host_dev') ) 
        return conf('host_dev');
      // pokud env == production && je nastavený host_prod
      else if ( conf('env') == 'production' && conf('host_prod') )
        return conf('host_prod');
      else return null;
     },

    responsive_image_sizes : [500, 800, 1000, 1600, 2000, 2400],

    file_path_before        : false,                // přidá před cesty k souborům, např wp-content/plugins/wpt/
    nice_urls               : false,
    page_link_ext           : '.html',
    page_file_ext           : 'html',
    include_head_favicon    : true,
    include_head_social     : true,
    include_svg_sprites     : true,
    active_menu_item_class  : 'menu-link-active',
    svg_sprite_default_file : 'sprite',
    
    addon_move_on_top : true,
    addon_dev_button  : false,
    
    data_price_append     : ' ,-',
    data_price_decimal    : 0,
    data_price_round      : 1,       // 1, 10, 100
    data_price_random_min : 100,
    data_price_random_max : 900,
  },

  // Site Defaults
  site: {
    url                      : 'https://bramborarstvi-mrkvicka.cz',
    name                     : '[default] Bramborářství Mrkvička',
    title                    : '[default] Prodej a výsadba bramborových věcí',
    description              : '[default] Popisek webu, několik vět o službě atd',
    theme_color_primary      : '#1c2536',
    theme_color_secondary    : '#008800',
    og_title                 : () => site('name'),                                   // Open Graph titulek, defaultně se dědí ze site.name
    og_description           : () => site('description'),                            // Open Graph popisek, defaultně se dědí ze site.description
    og_site_name             : () => site('name'),                                   // Open Graph site_name, defaultně se dědí ze site.name
    og_image_primary         : 'img/social/social-share-img-primary.jpg',            // Open Graph obrázek
    og_image_secondary       : 'img/social/social-share-img-secondary.jpg',          // Open Graph obrázek
    service_google_analytics : null,                                                 // Google Analytics ID
  },
    
  // Page Defaults
  page: {
    
    //- např. nazev-stranky
    slug : null,
    
    //- identifikator skupiny do které patří stránka (top level stránka)
    //- používá se nejčastěji pro označení položky menu jako aktivní
    group : null,
    
    title_prefix  : () => site('name'),    // Page Title se skládá z title_prefix ...
    title_parser  : ' → ',                 // spojovník → / | -
    title_base    : () => site('title'),   // + title_base
    title_postfix : null,                  // + title_postfix
    
    //- přednastavený formát title, dá se změnit v template-base
    title_preset : () => page('title_prefix') + page('title_parser') + page('title_base'),

    description        : () => site('description'),          // Popisek konkrétní stránky
    og_title           : () => site('og_title'),             // Open Graph titulek, defaultně se dědí ze site.og_title
    og_description     : () => site('og_description'),       // Open Graph popisek, defaultně se dědí ze site.og_description
    og_image_primary   : () => site('og_image_primary'),     // Open Graph site_name, defaultně se dědí ze site.og_site_name
    og_image_secondary : () => site('og_image_secondary'),   // Open Graph site_name, defaultně se dědí ze site.og_site_name
  }
}

// Merge a `source` object to a `target` recursively
const merge = (target, source) => {
  // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object) Object.assign(source[key], merge(target[key], source[key]))
  }
  // Join `target` and modified `source`
  Object.assign(target || {}, source)
  return target
}

// Merged Settings
// var settings = merge(settings_default, settings_custom);

function getSettings (settings_custom = null) {
  return settings_custom ? merge(settings_default, settings_custom) : settings_default;
}

var settings = getSettings();

// Value from settings
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


module.exports = {
  getSettings,
  settings,
  path,
  build,
  conf,
  site,
  page
}

