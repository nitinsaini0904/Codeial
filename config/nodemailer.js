const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transpoter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
      user: 'nsaini0904@gmail.com',
      pass: 'fsoohnolocwzjwbd'
  }
});

let renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, '../views/mailers', relativePath),
    data, 
    function(err,template){
      if(err){ console.log('Error in rendering template', err); return;}

      mailHTML = template;
    }
  );  

  return mailHTML;
}

module.exports = {
  transpoter: transpoter,
  renderTemplate: renderTemplate
}