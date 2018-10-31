var request = require("request");

var url = 'http://localhost:3000/nickname';

request.post({url: url, form: {user: "AAAA"}}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body + "\n");
    }
});

request.post({url: url, form: {user: "BBBB"}}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body + "\n");
    }
});

request.post({url: url, form: {user: "ZZZZ"}}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body + "\n");
    }
});