const express = require("express");
const index = require('./routes/index');

const app = express();
const port = 3000;

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use('', index);

app.listen(port, () => {
    console.log(`Server running on: ${port}`);
});
