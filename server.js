// Require Express.js
const express = require('express')
const app = express()

// Start an app server
const argv = minimist(process.argv.slice(2))
argv['port']
const port = argv.port || 5000

const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});

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



