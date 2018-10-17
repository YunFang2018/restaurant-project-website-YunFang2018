/*
    Restaurant Takeout ordering via web
*/
const foodMenu = require('./lunchTakeout.json'); // Our menu
var express = require('express');
var app = express();
app.use(express.static('public')); // For static assets
var bodyParser = require('body-parser');
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// Template system
const nunjucks = require('nunjucks');
nunjucks.configure('templates', {autoescape: true, express: app});

app.get('/', function(req, res) {
    res.render('TakeOutOrderForm.html', foodMenu);
});


/* Process the form below */
menu = foodMenu.menu;
countInput = 0;
countDish = {"item.name":"hh","item.price":"1"};
cDish = 0;

menu.Entries[0].name

app.post('/web_order',urlencodedParser,function(req,res){
    let info = req.body;
    console.log(info['Chicken Satay']);
    var subTotal = 0;
    for( i=0;i<1;i++)
        {
            for( t=0; t< menu.Starters.length; t++){
                //itemnamee = Starters.name; 
                console.log(info[menu.Starters[t].name]);
                if(info[menu.Starters[t].name]!==0){
                    //countInput = info.myform.name.value;
                    //fname = menu.Starters[i].name;
                    //fprice = menu.Starters[i].price;
                    //countDish.push({"item.name":fname,"item.price":fprice});
                    if(info[menu.Starters[t].num]!==0){
                    foodMenu.menu.Starters[t].num=info[menu.Starters[t].name];
                    foodMenu.menu.Starters[t].iTotal=info[menu.Starters[t].name]*menu.Starters[t].price;
                    console.log(foodMenu.menu.Starters[t].iTotal);
                    subTotal=subTotal+foodMenu.menu.Starters[t].iTotal;
                    }
                }
            }
              for( o=0; o< menu.Entries.length;o++){
                if(info[menu.Entries[o].name]!==0){
                    //countInput = info.myform.name.value;
                    //countDish.push({"item.name":menu.Entries[o].name,"item.price":menu.Entries[o].price});
                    foodMenu.menu.Entries[o].num=info[menu.Entries[o].name];
                    foodMenu.menu.Entries[o].iTotal=info[menu.Entries[o].name]*menu.Entries[o].price;
                    subTotal=subTotal+foodMenu.menu.Entries[o].iTotal;
                }
            }
              for( l=0; l< menu.Drinks.length; l++){
                if(info[menu.Drinks[l].name]!==0){
                    //countInput = info.myform.name.value;
                    //countDish.push({"item.name":menu.Drinks[l].name,"item.price":menu.Drinks[l].price});
                    foodMenu.menu.Drinks[l].num=info[menu.Drinks[l].name];
                    foodMenu.menu.Drinks[l].iTotal=info[menu.Drinks[l].name]*menu.Drinks[l].price;
                    subTotal=subTotal+foodMenu.menu.Drinks[l].iTotal;
                }
                foodMenu.subTotal=subTotal;
                foodMenu.subTotal=foodMenu.subTotal.toFixed(2);
                foodMenu.tax=subTotal*0.0725;
                foodMenu.tax = foodMenu.tax.toFixed(2);
                foodMenu.total=subTotal*1.0725;
                foodMenu.total = foodMenu.total.toFixed(2);
                console.log(foodMenu.total);
            }
        }

    res.render('TakeOutConfirmation.html', foodMenu);
});
// What method should you use? Hint look at the order Form.
// What URL should you listen on?
// Do you need to process the body in any way?
// app.?method?('/?processing_url?', ?some_kind_of_body_parser?, function(req, res) {


//     Below is some code that I used to simplify the menu to make it
//      easier to look up prices. You don't have to use this.
//     let raw_menu = {};
//     for (let cat in foodMenu.menu) {
//         for (let item of foodMenu.menu[cat]) {
//             raw_menu[item.name] = item.price;
//         }
//     }
//     // console.log(JSON.stringify(raw_menu));  // for debugging

/*  You need to process the body (customer order here), compute item totals
    compute order subtotal, compute tax, and compute total.
 */
    // I'd use a template to render the order specific response.
//     res.render('TakeOutConfirmation.html', order);
// });

//let renderInfo = {country, population};
//             res.render('population.html', renderInfo);

const host = '127.0.8.1';
const port = '2399';// Last digits of my NetID is : 9932 so that I cannot use!!!!!
app.listen(port, host, function () {
    console.log("restaurantOrder.js app listening on IPv4: " + host +
	":" + port);
});
