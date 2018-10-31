var request = require("request");


var url = ['http://localhost:3000/', 'http://localhost:3000/sun', 'http://localhost:3000/moon'];


var j = request.jar();


request({url: url[0], jar: j}, function (err, res) {
    var s = "";
    if (typeof(res.cookies) != "undefined") {
        s = res.cookies;
    }
    console.log("Path /:Testing cookies, I received: {" + s + "}");


    s = j.getCookieString(url[1]);
    console.log("Path /sun:Testing cookies, I received: {" + s + "}");


    s = j.getCookieString(url[2]);
    console.log("Path /moon:Testing cookies, I received: {" + s + "}");

    s = j.getCookieString(url[0]);
    console.log("Path /:Testing cookies, I received: {" + s + "}");
});