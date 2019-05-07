const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const routes = require('./routes/index.js');
const {user} = require('./sequelize');
const {Post} = require('./sequelize');




app.use(express.static(__dirname + '/public'));



 // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());


app.use(routes);

const PORT = process.envPORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${PORT}!`));