var request = require("request");
var users = [
    {name: "AAAA", nickname: "aaaa"},
    {name: "BBBB", nickname: "bbbb"},
    {name: "CCCC", nickname: "cccc"},
    {name: "DDDD", nickname: "dddd"},
    {name: "EEEE", nickname: "eeee"}
];

var url = 'http://localhost:3000/register';
users.forEach(function (e) {
    request.put({url: url, form: e}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body + "\n");
        }
    })
});
