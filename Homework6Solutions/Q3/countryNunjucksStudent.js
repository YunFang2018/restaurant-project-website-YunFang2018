/*  Gives the population of a country based on a JSON
    file of population information. */

const express = require('express');
var app = express();
const nunjucks = require('nunjucks');

nunjucks.configure('templates', {
    autoescape: true,
    express: app
});
// The population data
const populations = require('./country-by-population.json');

let host = '127.0.8.1'; // Choose a different loopback address
let port = '2399'; // Last digits of my NetID is : 9932 so that I cannot use!!!!!
let myName = 'Yun-Fang Wei'; // Change this too.

let info = {host: host, port: port, name: myName}


//app.get('/', function (req, res) {
//    res.render('hello.html', info);
//});

let ppopulations= populations; 
let population = 0;

recount = 0;
pages = [];
for (var i=0; i<ppopulations.length; i++){
     
pages.push({"country": ppopulations[i].country, "population": ppopulations[i].population});   
    
 }


app.get('/country/:cname', function (req, res) {
    let country = req.params.cname;
    status = 0;
   
     for (var i=0; i<pages.length; i++){
         if(pages[i].country === country){
             population = pages[i].population;
             status = 1;
             break;
         } 
     }
    if(status)
        {
             let renderInfo = {country, population};
             res.render('population.html', renderInfo);
        }
    else
        {
            var Allpopulation = [];
            var Allcountry = []
            countt = 0;
            for (var i=0; i<pages.length; i++){
                country1=country;
                if(pages[i].country.slice(0,2) ===country.slice(0,2)){
                    Allpopulation[countt] = pages[i].population;
                    Allcountry[countt] = pages[i].country;
                    countt++;
                    
                }
            }
            
            res.send(`<h1>Could not find ${country1}</h1><h2>Similary country names and populations:</h2><ul> <li>${Allcountry[0]} population: ${Allpopulation[0]}</li><li>${Allcountry[1]} population: ${Allpopulation[1]}</li><li>${Allcountry[2]} population: ${Allpopulation[2]}</li><li>${Allcountry[3]} population: ${Allpopulation[3]}</li>`);
        }
   
    
    // Populate render info here with the stuff you
    // Need in the template.  Hint use Javascript array
    // Methods such as find and filter, and use
    // Javascript String methods like slice and toUpperCase...
    // You need to create the population.html template file
    // in the `templates` directory...
   
});


app.listen(port, host, function () {
    console.log("Example app listening on IPv4: " + host +
	":" + port);
});