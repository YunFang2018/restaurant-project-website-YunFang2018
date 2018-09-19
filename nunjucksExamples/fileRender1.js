/* A file to try rendering a file with *nunjucks* will import data
    from a JSON file. 
*/

const nunjucks = require('nunjucks');
const user = require('./user.json');
const fs = require('fs');  // The file system module

nunjucks.configure({ autoescape: true });
nunjucks.configure('views', { autoescape: true });
let outString = nunjucks.render('hello.njk', user);
fs.writeFileSync('./output/hello.html', outString);
console.log("Wrote file");
//console.log(outString);