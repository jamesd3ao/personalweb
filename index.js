const express = require('express');
const app = express();
const port = 3000;
var heroku = process.env.PORT;
const bodyParser = require('body-parser');
var path = require('path');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: 'rhgmdev@gmail.com',
    pass: 'Robert123**'
  }
});

app.use(express.static(path.join(__dirname, 'HTML')));


app.listen((heroku || port), () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile('index_13.html', { root: './HTML/'})
});

app.post('/sendEmail', (req, res) => {

  var mailOptions = {
    from: 'visiondelibertad@gmail.com',
    to: 'garcia.robert1020@gmail.com',
    subject: 'My Professional Web Page',
    text: 'User: ' +req.body.name + ' Email User: ' + req.body.email + ' Subject: ' + req.body.subject + ' Message: ' +req.body.comments
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


  res.status(200);
});