module.exports = {

  site: {
    url                   : 'https://bramborarstvi-mrkvicka.cz',
    name                  : 'xxx Bramborářství Mrkvička',
    // name                  : '[default] Bramborářství Mrkvička',
    title                 : '[default] Prodej a výsadba bramborových věcí',
    description           : '[default] Popisek webu, několik vět o službě atd',
    theme_color_primary   : '#008800',
    theme_color_secondary : '#1c2536',
  },

  page: {
  },

  // content: {
  //   homepage: {
  //     group: 'base',
  //     slug: 'homepage',
  //     title: 'Homepage',
  //   },
  //   detailOfItem: {
  //     group: 'ecommerce',
  //     slug: 'kategorie',
  //     title: 'Kategorie',
  //   },
  //   categoryOfItems: {
  //     group: 'ecommerce',
  //     slug: 'kategorie',
  //     title: 'Kategorie',
  //   },
  //   cartProcessListOfItems: {
  //     id: 'cart-process-list-of-items',
  //     slug: 'kosik-1-obsah-kosiku',
  //     title: 'Obsah košíku',
  //   },
  // },

  config: {
    host_dev          : null,
    file_path_before  : false,     // např. wp-content/plugins/wpt/
    nice_urls         : false,     // nazev-stranky.html -> nazev-stranky/
    page_link_ext     : '.html',
    page_file_ext     : 'html',
    addon_move_on_top : true,
    data_price_append: ' Kč',
    data_price_decimal: 2,

    addon_dev_button  : true,
  },

  build: {
    sitemap    : true,
    favicon    : true,
    img_resize : true,
  }

}