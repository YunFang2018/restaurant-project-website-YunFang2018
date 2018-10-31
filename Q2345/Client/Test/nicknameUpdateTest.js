var request = require("request");

var url = 'http://localhost:3000/nicknameUpdate';
var data = [
    {Rname: "AAAA2", Rpassword: "12345", user: "CCCC2"},//(i) authenticated request with user name in data base
    {Rname: "ZZZZ", Rpassword: "12345", user: "CCCC2"},//(ii) authenticated request with user name not in data base
    {Rname: "AAAA2", Rpassword: "xyz", user: "CCCC2"}//p(iii) request with invalid password or requestor name.
];


data.forEach(function (e) {
    request.post({url: url, form: e}, function (error, response, body) {
        console.log(body + "\n");
    });
});
