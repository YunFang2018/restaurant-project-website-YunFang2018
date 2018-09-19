/* A file to see if *nunjucks* is installed and
    whether we can run a simple example.
*/

nunjucks = require('nunjucks');
nunjucks.configure({ autoescape: true });
let helloStr = nunjucks.renderString('Hello {{ username }}', { username: 'Dr. B.' });
console.log(helloStr);
