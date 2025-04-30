//Basic Express+Pug Installation
const express = require("express");
const app = express();
const path = require('path');
app.set('view engine', 'pug');

const { data } = require('./data.json');  //all data
const { projects } = data; //projects object only

//access to the public files like public/
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

//  Routes 

app.get('/', (req, res) => { 
    res.render('index');
}); 

app.get('/about', (req, res) => { 
    res.render('about');
}); 

app.get('/project', (req, res) => { 
    res.redirect('project/0');
});

app.get('/project/:id', (req, res) => {
    const projectData = projects[req.params.id]
    console.log(projectData)
    res.render('project', projectData);
}); 

// Error Handling
//Call 404
app.use((req, res, next) => {
    const err = new Error('not found 404');
    // err.status = 404;
    next(err)
})

//prints the error
app.use((err, req, res, next) => {
    console.log(err)
    // res.locals.error = err;
    // res.status(err.status);
    res.send('<h1>error</h1>');
})


//Server location & response
app.listen(3000, () => {
    console.log('This server is running on http://localhost:3000/')
}); 
