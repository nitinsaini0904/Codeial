const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = 1000;
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');

// middleware
app.use(express.urlencoded());

// calling cookie parser 
app.use(cookieParser());

// adding Layouts
app.use(expressLayouts);

// including static files
app.use(express.static('./assets'));

// extract styles and scripts from subpages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// adding view engine as ejs
app.set('view engine','ejs');
app.set('views','./views');

// use of express router
app.use('/', require('./routes'));

 
app.listen(port,function(err){
  if(err){
    console.log(`Error in running : ${err}`);
    return;
  }

  console.log(`Server is running of port: ${port}`);
})