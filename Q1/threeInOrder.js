/*  Demonstration of promises to put HTTP requests for
    Node.js in a particular order.
*/
const rp = require('request-promise-native');
let site1 = {
    uri: 'https://tw.yahoo.com/',
    method: 'HEAD', // What does this do?
    resolveWithFullResponse: true
};

let site2 = {
    uri: 'http://www.google.com',
    method: 'HEAD',
    resolveWithFullResponse: true
};

let site3 = {
    uri: 'https://www.momoshop.com.tw/main/Main.jsp',
    method: 'HEAD',
    resolveWithFullResponse: true
};

let start = new Date();
rp(site1).then(res => {
    // console.log(`Grotto status: ${JSON.stringify(res)}`);
    let time = (new Date() - start)/1000;
    console.log(`tw.yahoo status: ${res.statusCode}, time: ${time}`);
    return rp(site2);
}).then(res => {
    let time = (new Date() - start)/1000;
    console.log(`Google status: ${res.statusCode}, time: ${time}`);
    return rp(site3);
}).then(res => {
    let time = (new Date() - start)/1000;
    console.log(`momo shopping status: ${res.statusCode}, time: ${time}`);
})
console.log("Starting my web requests:");
