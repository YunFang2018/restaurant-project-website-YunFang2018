var request = require("request");
var users = [
    {name: "AAAA2", nickname: "aaaa2", password: "12345"},
    {name: "BBBB2", nickname: "bbbb2", password: "monkey"},
    {name: "CCCC2", nickname: "cccc2", password: "1q2w3e4r"},
    {name: "DDDD2", nickname: "dddd2", password: "qwerasdf"},
    {name: "EEEE2", nickname: "eeee2", password: "xyz"}
];

var url = 'http://localhost:3000/registration';
users.forEach(function (e) {
    request.post({url: url, form: e}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body + "\n");
        }
    })
});
