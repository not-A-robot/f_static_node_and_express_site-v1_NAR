//Basic Express+Pug Installation
const express = require("express");
const app = express();
app.set('view engine', 'pug');

//access to the public files like public/
app.use('/static', express.static('public'));

//Starting Route: Update Later
app.get('/', (req, res) => { 
    res.render('index');
}); 

//Server location & response
app.listen(3000, () => {
    console.log('This server is running on http://localhost:3000/')
}); 
