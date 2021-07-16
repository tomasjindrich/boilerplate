var { getSettings, settings, path, conf, site, page } = require('./core/settings.js');
var { test, root } =  require('./tools/tools.js');

// var settings = getSettings();

console.log(test())
console.log(site('url'))

// console.log(site('og_title'))
console.log(conf('host_prod'))
// console.log(conf('host'))
console.log( path('dist') + '/**/*.' + conf('page_file_ext') )

      
  

