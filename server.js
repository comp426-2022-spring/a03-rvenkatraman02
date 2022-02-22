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
    const flips = manyflips(req.params.number)
	//Some
	//expressions
	//go
	//here
});

app.get('/app/flip', (req,res) => {
    res.status(200).json({'flip' : coinFlip()})
})

app.use(function(req,res) {
    res.status(404).end('Endpoint does not exist')
    res.type('text/plain')
})


