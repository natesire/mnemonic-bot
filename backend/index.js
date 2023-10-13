const cors = require('cors');
const express = require('express')
const app = express()

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

    res.setHeader('Access-Control-Allow-Origin', req.header('origin') 
    || req.header('x-forwarded-host') || req.header('referer') || req.header('host'));

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    // Request headers you wish to allow
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(cors({ credentials: false }));

app.get('/', function (req, res) {
  //res.send('Hello World')
    // respond with json response
    res.json({ message: 'Hello World' })
    console.log('hello world');
    console.log(req.header('origin'));
    console.log(req.header('x-forwarded-host'));
    console.log(req.header('host'));
})

app.listen(3000)