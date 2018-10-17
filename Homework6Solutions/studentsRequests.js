/* Starter file for practicing HTTP requests */

const request = require('request');

function lookAtResponse(response) {
    console.log(`Status: ${response.statusMessage}`);
    console.log(`Status code: ${response.statusCode}`);
    console.log(`request: ${JSON.stringify(response.request)}`);
    console.log(`HTTP version: ${response.httpVersion}`);
    console.log(`trailers: ${JSON.stringify(response.trailers)}`);
    
}

function lookIntoHeader(respond){
    console.log('Headers:');
    for(var key in respond.headers)
    {
        console.log(key+'= '+respond.headers[key]);
    }
}

function lookAtBody(body) {
    console.log('body size:', body.length); 
}

// Example request...

request.get("http://www.grotto-networking.com/hiClass.html",
    function(error, response, body){
    if (error) {
        console.log('error:', error);
        return;
    };
    lookIntoHeader(response);
    lookAtResponse(response);
    lookAtBody(body);
    console.log("\n\n\n");
    
var start = Date.now();
request.get({ url : 'http://www.grotto-networking.com:44/patents.html', time : true,timeout: 2000},function(err, response){ console.log('Request time in ms',Date.now() - start)});
    
request.get("https://windsurf.grotto-networking.com/data/logs/windEvents2018.json", function(error, response, body){ lookAtResponse(response);
lookAtBody(body);
lookIntoHeader(response); 
console.log(`Json:`);
var info = JSON.parse(body);
for(t = 0;t<35; t++){
    console.log(info[t]);
}  
var total =0; 
for(i=0; i < 35; i++){
    total += parseFloat(info[i].sail)
} 
console.log(total + " miles were sailed that day");
console.log("\n\n\n");});

});
