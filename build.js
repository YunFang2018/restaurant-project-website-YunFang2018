var Metalsmith  = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var nav = require("./nav.json");
var foodmenu = require("./foodmenu.json");
var openhours = require("./openhours.json");
var service = require("./service.json");
var info = require("./info.json");

Metalsmith(__dirname)         // __dirname defined by node.js:
                              // name of current working directory
  .metadata({                 // add any variable you want
                              // use them in layout, other plugins
    author: "YunFangWei",
    links: nav,               // Add navigation information
	menu: foodmenu,
	openhours:openhours,
    service:service,
    info:info
  })
  .source('./src')            // source directory
  .destination('./build')     // destination directory
  .clean(true)                // clean destination before
  .use(markdown())
  .use(layouts({
    default: "base.njk",
    directory: "layouts",
    pattern: ["*", "!*.js", "!*.css"]
}))
  .build(function(err) {      // build process
    if (err) throw err;       // error handling is required
  });