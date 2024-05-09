const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')

//parse application json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors())

//routes
var routes = require('./routes');
routes(app);

app.listen(5000, () => {
    console.log(`Server started on port`);
});