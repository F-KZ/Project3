import nodemailer from 'nodemailer'

// mmma ngaq lyid kgzk
export const verificationEmail = (token, email, name, id) => {
    const html = `
    <html>
    <body>
    <h2>Dear ${name}</h2>
    <p>Thanks for signing up</p> 
    <p>use the link below</p> 
    <a href="http://localhost:5000/email-verify/${token}">Click Here</a>    
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
        subject : 'Please verify your email adress',
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

