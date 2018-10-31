var request = require("request");


var url = ['http://localhost:3000/', 'http://localhost:3000/wend', 'http://localhost:3000/gend'];


request.get({url: url[0]}, function (error, res, body) {
    var s = "";
    if (typeof(res.cookies) != "undefined") {
        s = res.cookies;
    }
    console.log("Path " + "/: Testing cookies, I received: {" + s + "}");
});

request.get({url: url[1]}, function (error, res, body) {
    var s = "";
    if (typeof(res.cookies) != "undefined") {
        s = res.cookies;
    }
    console.log("Path " + "/sun: Testing cookies, I have a : {" + s + "}");
});


request.get({url: url[2]}, function (error, res, body) {
    var s = "";
    if (typeof(res.cookies) != "undefined") {
        s = res.cookies;
    }
    console.log("Path " + "/moon: Testing cookies, I have a: {" + s + "}");
});
