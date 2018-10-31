var request = require("request");

var url = 'http://localhost:3000/allUsers';

request.get({url: url}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body + "\n");
    }
});