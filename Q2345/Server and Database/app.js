var express = require('express');
var Datastore = require("nedb");
var bodyParser = require("body-parser");
var bcrypt = require("bcryptjs");
var app = express();
var cookieParser = require("cookie-parser");

var db = {};
db.users = new Datastore({
    filename: "./data/users.db",
    autoload: true
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


app.put("/register", function (req, res) {
    var name = req.body.name;
    var nickname = req.body.nickname;
    var json = {};
    db.users.find({name: name}, function (err, docs) {
        if (docs.length != 0) {
            json.registration = "failed";
            json.reason = "user exists";
            json.name = name;
            res.send(json);
        } else {
            db.users.insert(req.body, function (err, newDoc) {
                if (!err) {
                    json.resistration = "succeeded";
                    json.reason = "nothing on success";
                    json.user = name;
                    res.send(json);
                }
            })
        }
    })
});

app.post("/registration", function (req, res) {
    var name = req.body.name;
    var json = {};
    db.users.find({name: name}, function (err, docs) {
        if (docs != null && docs.length != 0) {
            json.registration = "failed";
            json.reason = "user exists";
            json.name = name;
            res.send(json);
        } else {
            var salt = bcrypt.genSaltSync(10);
            req.body.password = bcrypt.hashSync(req.body.password, salt);
            db.users.insert(req.body, function (err, newDoc) {
                if (!err) {
                    json.resistration = "succeeded";
                    json.reason = "nothing on success";
                    json.user = name;
                    res.send(json);
                }
            })
        }
    })
});


app.get("/allUsers", function (req, res) {
    var json = {
        date: new Date().toLocaleString()
    };

    db.users.find({}, {name: 1, _id: 0}, function (err, docs) {
        json.users = docs;
        res.send(json);
    })
});


//allUsers 升级版本
app.post("/allUsersUpdate", function (req, res) {
    db.users.findOne({name: req.body.Rname}, function (err, docs) {
        if (docs != null && bcrypt.compareSync(req.body.Rpassword, docs.password)) {
            db.users.find({}, {name: 1, _id: 0}, function (err, docs) {
                res.send({
                    date: new Date().toLocaleString(),
                    users: docs
                });
            })
        } else {
            res.send({info: "invalid password or name"});
        }
    })
});


app.post("/nickname", function (req, res) {
    var name = req.body.user;
    db.users.findOne({name: name}, function (err, docs) {
        if (docs == null) {
            res.send({user: name, err: "Not Found"});
        } else {
            res.send({
                user: name,
                nickname: docs.nickname
            })
        }
    });
});

//nickname update
app.post("/nicknameUpdate", function (req, res) {
    db.users.findOne({name: req.body.Rname}, function (err, docs) {
        if (docs != null && bcrypt.compareSync(req.body.Rpassword, docs.password)) {
            db.users.findOne({name: req.body.user}, {name: 1, nickname: 1, _id: 0}, function (err, docs) {
                res.send(docs);
            })
        } else {
            res.send({info: "invalid password or name"});
        }
    })
});


//cookie question
app.get("/", function (req, res) {
    res.cookie("name", "home", {path: "/", httpOnly: false});
    res.cookie("sp", "sun", {path: "/sun", httpOnly: false});
    res.cookie("sd", "moon", {path: "/moon", httpOnly: false});
    res.send("/");
});

app.get("/sun", function (req, res) {
    res.send("/I have a sun");
});
app.get("/moon", function (req, res) {
    res.send("/I have a moon");
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});