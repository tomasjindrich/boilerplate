module.exports = {

    project: {
        developer: {
          name: 'Tomáš Jindřich',
          url: 'https://www.tomasjindrich.cz',
        }
    },

    site: {
      url: 'https://bramborarstvi-mrkvicka.cz',
      name: '[default] Bramborářství Mrkvička',
      title: '[default] Prodej a výsadba bramborových věcí',
      description: '[default] Popisek webu, několik vět o službě atd',

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
        og_image_primary: 'img/social/social-share-img-primary.jpg', // Open Graph obrázek
        og_image_secondary: 'img/social/social-share-img-secondary.jpg', // Open Graph obrázek
      },


      service: {
        ga: {
          name: 'Google Analytics',
          id: null,
        }
      }

    },

    loader: {
      data: {
        
      }
    },

    dummy: {
      price: {
        min: 100,
        max:  900,
        decimal: 2,
        round: 1,
        append: ' Kč'
      }
      
    },

    // *  *  *  *  *


    config: {

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
      },

      router: {
        niceUrl: false
      },
      
      page_link_ext: '.html',
      page_file_ext: 'html',
      active_menu_item_class: 'menu-link-active',
      svg_sprite_default_file: 'sprite',


    },

    render: {
      head: {
        favicon: true,
        social: true,
      },
      moveOnTop: true,
      devTool: true,
      
    },


    // *  *  *  *  *


  }



