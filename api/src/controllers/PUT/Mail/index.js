const nodemailer = require('nodemailer');
const {EMAIL, EMAIL_PASSWORD} = process.env;

const subscriptionMail = (userEmail) => {
    let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL,
            pass: EMAIL_PASSWORD
        }
    })

    let mailContent = {
        from: EMAIL,
        to: userEmail,
        subject: "The corner movies subscription",
        html: 
        `<h3>🥳 Thank you for subscribing to The corner movies! 🥳</h3>
        <p>
            You now have access to: 
            <ul>
                <li>Unlimited reviews per day</li>
                <li>Unlimited lists</li>
                <li>Movie news section</li>
            </ul>
            The corner movies team 🍿
        </p>`
    }

    mailTransporter.sendMail(mailContent, (error) => {
        if(error){
            console.log(error)
        } else {
            console.log("Mail has been sent to the user");
        }
    })    
}

module.exports = {subscriptionMail}