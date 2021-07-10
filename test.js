var { getSettings, settings, path, conf, site, page } = require('statica/core/settings.js');
var { test, root } =  require('statica/tools/tools.js');
settings = getSettings( require('./settings.js') );

console.log(test())
console.log(site('url'))

// console.log(site('og_title'))
console.log(conf('host_prod'))
// console.log(conf('host'))
console.log( path('dist') + '/**/*.' + conf('page_file_ext') )

      
  

