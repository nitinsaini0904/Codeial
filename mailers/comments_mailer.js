// const nodemailer = require('../config/nodemailer');

// // This is another way of exporting a method
// exports.newComment = (comment) => {
//   let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

//   nodemailer.transpoter.sendMail({
//     from: 'nsaini0904@gmail.com',
//     to: comment.user.email,
//     subject: "New Comment Published",
//     html: htmlString
//   }, (err, info) => {
//     if(err){ console.log('Error in sending mail', err); return;}

//     console.log('Mail delivered', info);
//     return;
//   });
// }