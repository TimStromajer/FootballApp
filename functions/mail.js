var nodemailer = require('nodemailer');

const handler = async (event) => {
    if (event.httpMethod == "POST") {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'tiimcek@gmail.com',
              pass: 'lcwlfgocltklexsg'
            }
          });
          
          var mailOptions = {
            from: 'tiimcek@gmail.com',
            to: 'tiimcek@gmail.com',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
}

module.exports = { handler }