// Require Express.js
const express = require('express');
const app = express();

// Get Port
const args = require("minimist")(process.argv.slice(2));

const port = args.port || 5000;

// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port));
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
    res.status(404).send('404 NOT FOUND');
});

app.get('/app/', (req,res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead(res.statusCode, {'Content-Type' : 'text/plain'});
        res.end(res.statusCode+ ' ' +res.statusMessage);
});

// Endpoint definition
app.get('/app/flip', (req,res) => {
    res.contentType('text/json');
    res.status(200).json({'flip' : coinFlip()});
});

app.get('/app/flips/:number', (req, res) => {
    res.contentType('text/json');
    const flips = coinFlips(req.params.number);
    const count = countFlips(flips);
    res.status(200).json({'raw':flips,'summary' : count});
});

app.get('/app/flip/call/heads', (req,res) => {
    res.contentType('text/json');
    res.status(200).json(flipACoin('heads'));
});

app.get('/app/flip/call/tails', (req,res) => {
    res.contentType('text/json');
    res.status(200).json(flipACoin('tails'));
});

app.use(function(req,res) {
    res.status(404).end('Endpoint does not exist');
    res.type('text/plain');
});