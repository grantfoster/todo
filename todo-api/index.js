var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

var todoRoutes = require('./routes/todos');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.send('HELLO FROM THE ROOT ROUTE');
});

app.use('/api/todos', todoRoutes);

app.listen(3000, function() {
    console.log("app is running");
})