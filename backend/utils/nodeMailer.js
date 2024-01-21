import nodemailer from 'nodemailer';

const sendResetMail = (name, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: 'codept100@gmail.com',
        pass: 'meuxsoapsuqstgsi'
      }
    });

    const mailOptions = {
      from: 'codept100@gmail.com', 
      to: email, // You should use the provided email, not a hardcoded one
      subject: "Reset your password",
      text: "Hello",
      html: `<p>Hi ${name}, this is your otp <b>${token}</b></p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
     
        // Handle the error, e.g., throw an error or return an error response.
      } else {
        console.log("Email has been sent successfully", info.response);
        // Handle the success, e.g., return a success response.
      }
    });
  } catch (error) {
    console.log(error.message);
    // Handle the error, e.g., throw an error or return an error response.
  }
};

export default sendResetMail;
