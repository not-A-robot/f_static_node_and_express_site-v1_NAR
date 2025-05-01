//Basic Express+Pug Installation
const express = require("express");
const app = express();
const path = require('path');
app.set('view engine', 'pug');

const { data } = require('./data.json');  //all data
const { projects } = data; //projects object only

//Access to the public files like public/
app.use('/static', express.static(path.join(__dirname, 'public')));

//Correction: remove trailing / on routes
app.use((req, res, next) => {
    if (req.path !== '/' && req.path.endsWith('/')) {
        const query = req.url.slice(req.path.length); // preserve query string
        const cleanUrl = req.path.slice(0, -1) + query;
        return res.redirect(301, cleanUrl);
    }
    next();
});

//---------//
//  Routes 
//---------//

app.get('/', (req, res) => { 
    res.render('index', data);
}); 

app.get('/about', (req, res) => { 
    res.render('about');
}); 

app.get('/project', (req, res) => { 
    res.redirect('project/0');
});

app.get('/project/:id', (req, res) => {
    const projectData = projects[req.params.id]
    res.render('project', projectData);
}); 

//----------------//
// Error Handling
//----------------//

//Call 404 on unknown route
app.use((req, res, next) => {
    res.status(404);
    res.locals.status = 404;
    res.locals.message = "Oops... This Page Doesn't Exist!";
    res.render('page-not-found');
});

//Error Handler
app.use((err, req, res, next) => {
    res.status(err.status || 500); //can accept error routing or if none set to 500
    res.locals.status = err.status || 500; //if undefined then 500
    if(res.locals.status === 500){
        res.locals.message = "A Server Error Has Occured";
    } else {
        res.locals.message = err.message;
    }
    res.locals.stack = err.stack
    res.render('error');
});

//Server location & response
app.listen(3000, () => {
    console.log('This server is running on http://localhost:3000/')
}); 
