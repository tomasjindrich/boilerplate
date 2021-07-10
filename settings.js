module.exports = {

  site: {
    url         : 'https://bramborarstvi-mrkvicka.cz',
    name        : '[default] Bramborářství Mrkvička',
    title       : '[default] Prodej a výsadba bramborových věcí',
    description : '[default] Popisek webu, několik vět o službě atd',
    theme_color : null,
  },

  config: {
    host_dev          : null,
    file_path_before  : false, // např. wp-content/plugins/wpt/
    nice_urls         : false, // nazev-stranky.html -> nazev-stranky/
    page_link_ext     : '.html',
    page_file_ext     : 'html',
    addon_move_on_top : true
  },

  build: {
    sitemap    : true,
    favicon    : true,
    img_resize : true,
  }

}