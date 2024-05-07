import nodemailer from 'nodemailer'

export const resetPassword = (token , email, name) => {
    const html = `
    <html>
    <body>
    <h2>Dear ${name}</h2>
    <p>use the link below to reset the password</p> 
    <a href="http://localhost:5000/password-reset/${token}">Click Here</a>    
    </body>
    </html>
    `

    const transporter = nodemailer.createTransport({
        service :'gmail',
        host: 'smtp.gmail.com',
    port: 465,
    secure: true,
        auth: {
            user: 'fantastiquefranck@gmail.com',
            pass: 'segn lyjh ypti oauj'

        }
    })

    const mailOptions = {
        from : 'fantastiquefranck@gmail.com',
        to : email,
        subject : 'Password Reset',
        html: html
    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        } else {
            console.log(`Email send to ${email}`);
            console.log(info.response);
        }
    })


}