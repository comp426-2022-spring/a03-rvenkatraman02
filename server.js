// Require Express.js
const express = require('express')
const app = express()

// Get Port
const args = require("minimist")(process.argv.slice(2))
args["port"]
if (args.port == undefined) { 
    args.port = 5000 
}
var port = args.port

// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});

function coinFlip() {
    let flip = Math.floor(Math.random() * 2);
    if (flip < 1) {
      return "tails";
    }
    else if (flip >= 1) {
      return "heads";
    }
}

function coinFlips(flips) {
    var results = [flips];
    for (let i = 0; i < flips; i++) {
        results[i] = coinFlip();
    }
    return results;
}

function countFlips(array) {
    let heads_num = 0;
    let tails_num = 0;
    if(array.length > 1) {
      for (let i = 0; i < array.length; i++) {
        if (array[i] == 'tails') {
          tails_num += 1;
        }
        else if (array[i] == 'heads') {
          heads_num += 1;
        }
      }
    }
    else if (array.length == 1) {
      if (array[0] == 'tails') tails_num += 1;
      else if (array[0] == 'heads') heads_num += 1;
    }
    if (heads_num == 0) return {tails: tails_num};
    else if (tails_num == 0) return {heads: heads_num};
    else return {heads: heads_num, tails: tails_num};
}

function flipACoin(call) {
    let toss = coinFlip();
    if (toss.toUpperCase() == call.toUpperCase()) return {call: call, flip: toss, result: "win"};
    else return {call: call, flip: toss, result: "lose"} ;
}

// Default response for any other request
app.use(function(req,res){
    res.status(404).send('404 NOT FOUND')
});

app.get('/app/', (req,res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead(res.statusCode, {'Content-Type' : 'text/plain'});
        res.end(res.statusCode+ ' ' +res.statusMessage)
});

// Endpoint definition
app.get('/app/flips/:number', (req, res) => {
    var array = coinFlips(req.params["number"])
    res.status(200).json({"raw": array, "summary" : {"tails" : countFlips(array).tails, "heads" : countFlips(array).heads}})
});

app.get('/app/flip/call/:this_call', (req,res) => {
    res.status(200).json(flipACoin(req.params["this_call"]))
})

app.use(function(req,res) {
    res.status(404).end('Endpoint does not exist')
    res.type('text/plain')
})

