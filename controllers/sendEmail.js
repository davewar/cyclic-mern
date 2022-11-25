const nodemailer = require("nodemailer");
require('dotenv').config()

// https://myaccount.google.com/lesssecureapps


const main =  (emailaddress, url, msg) => {
      //  console.log(emailaddress, url,msg)

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",    
    auth: {
      user: process.env.GMAIL_NAME, 
      pass: process.env.GMAIL_PASS, 
      
    },
  });

  let mailOptions = {
    from: '"DWShopping" <DWShopping.com>', // sender address
    to: emailaddress, // list of receivers
    subject: msg, // Subject line
    text: "", // plain text body
    html: `${url}`, // html body

  }

  // send mail with defined transport object
    transporter.sendMail(mailOptions, function(err,data){
        if(err){
          console.log(err.message);
        }else{
          console.log("email sent");
        }

  });

 
}

module.exports = main