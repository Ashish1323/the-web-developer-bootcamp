var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'riskyrajput2k@gmail.com',
    pass: 'Mom.2300'
  }
});

var mailOptions = {
  from: 'riskyrajput2k@gmail.com',
  to: 'ashishagnihotri2k@gmail.com',
  subject: 'Harami',
  text: 'This Message was sent from Nodemailer'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

// https://myaccount.google.com/lesssecureapps