const express = require('express');
const app = express();
const port = 1000;
const db = require('./config/mongoose');

const expressLayouts = require('express-ejs-layouts');

// adding layouts
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