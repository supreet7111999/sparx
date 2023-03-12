const nodemailer=require('nodemailer');

const sendMail=async (email,msg)=>{
    let testAccount=await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'genevieve82@ethereal.email',
            pass: 'cHKGMzKWqCywB3Efus'
        }
    });

    let mailDetails = {
        from: 'supreet7111999@gmail.com',
        to: email,
        subject: 'Success form submitted',
        text: msg
    };

    let info=await transporter.sendMail(mailDetails);
    // res.json(info);
}

module.exports=sendMail;