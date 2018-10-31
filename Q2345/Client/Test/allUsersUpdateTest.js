var request = require("request");

var url = 'http://localhost:3000/allUsersUpdate';


var data = {
    Rname: "AAAA2",
    Rpassword: "12345"
}
request.post({url: url, form: data}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body + "\n");
    }
});