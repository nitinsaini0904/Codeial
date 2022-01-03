const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = 1000;
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('./config/passport-local-strategy');
const session = require('express-session');
const MongoStore = require('connect-mongo');

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

// setting express-session for authentication
app.use(session({
  name: 'codeial',
  secret: 'nothingnothing',
  saveUnitialized : false,
  resave: false,
  cookie: {
    maxAge: (1000 * 60 * 100)
  },
  store: MongoStore.create(
    {
      mongoUrl: 'mongodb://localhost/codeial_development',
      autoRemove: 'disabled'
    },
    function(err){
      console.log(err || 'mongo db ok');
    }
  )
}));

// tell the index to use passport and session
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use of express router
app.use('/', require('./routes'));

app.listen(port,function(err){
  if(err){
    console.log(`Error in running : ${err}`);
    return;
  }

  console.log(`Server is running of port: ${port}`);
})