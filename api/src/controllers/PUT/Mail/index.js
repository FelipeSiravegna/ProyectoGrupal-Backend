const nodemailer = require('nodemailer');
const { EMAIL, EMAIL_PASSWORD } = process.env;

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
            You can now: 
            <ul>
                <li>Create your own movies</li>
                <li>Create unlimited lists</li>
                <li>Upload your own profile picture</li>
                <li>Access the movie news section</li>
                <li>Access the compare movies section</li>
            </ul>
            The corner movies team 🍿
        </p>`
    }

    mailTransporter.sendMail(mailContent, (error) => {
        if (error) {
            console.log(error)
        } else {
            console.log("Mail has been sent to the user");
        }
    })
}

const registrationMail = (userEmail) => {
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
        subject: "Welcome to the corner movies!",
        html:
            `<h3>🍿 Thanks for joining the corner movies! 🍿 </h3>
            <p>
                In the corner movies you can:
                <ul>
                    <li>Create your own lists and follow other users lists</li>
                    <li>Review your favourite movies</li>
                    <li>Follow other users and see their reviews and lists</li>
                    <li>See what movies are coming soon</li>
                    <li>Add movies to your 'watch later' list</li>
                    <li>See the details of any movie, including the director, cast, release date and more</li>
                </ul>
                You can also unlock more benefits if you subscribe!
                <br/>
                The corner movies team 🍿
            </p>`
    }

    mailTransporter.sendMail(mailContent, (error) => {
        if(error){
            console.log(error);
        } else {
            console.log("Mail has been sent to the user");
        }
    })
}

module.exports = { subscriptionMail, registrationMail }