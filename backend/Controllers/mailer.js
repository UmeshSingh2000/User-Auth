const nodemailer = require('nodemailer')
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.APP_PASS
    }
});
const sendEmail = async (to) => {
    const otp = Math.floor(Math.random()*10000)+1;
    const subject = 'Recover Your Password';
    const text = `Enter this Otp to Recover Your Account: ${otp}`;
    const mailOption = {
        from: process.env.USER_EMAIL,
        to,
        subject,
        text
    };
    try {
        const info = await transporter.sendMail(mailOption)
        console.log('Email sent: ' + info.response);
        return otp;
    }
    catch (error) {
        console.error('Error sending email:', error);
    }
}
module.exports = sendEmail;