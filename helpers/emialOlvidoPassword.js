import nodemailer from 'nodemailer';



const bodyHTML = ( nombre, token ) => {

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                *{ font-family: DejaVu Sans;}
            </style>
        </head>
        <body>
            <div style="width: 90%; margin: 0 auto;">
                <h1 style="font-weight: bold;">Hola! </h1>
                <p>
                    Hola ${nombre}, has solicitado reestablecer tu password
                </p>

                <p>Sigue el siguiente enlace para restablecer tu passwor</p>
                <p><b>Nota:</b> Si no solicitaste el restablecimoento de tu password ignora este emial</p>
        
                <a 
                    style="padding: 2px; text-align: center;  text-transform: uppercase; border: none; background-color: #ec4899"
                    href="${process.env.URL_FRONT}/olvide-password/${token}"
                    target="_black"
                >
                    Reestablecer password
                </a>
            </div>
        </body>
        </html>
    `;
}



const emialOlvidoPassword = async ({ email, nombre, token }) => {

    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.STMP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    try {
        const info = await transport.sendMail({
            from: 'APV - Administrador de pacientes de Veterinaria', // quien envia el email
            to: email, //Aquien se le manda el email
            subject: 'Reestablecer password',
            text: 'Reestablecer password',
            html: bodyHTML(nombre, token)
        })
        
        console.log(`Email enviado correstamente con el id: ${info.messageId}`)
    } catch (error) {
        
    }
    

}


export default emialOlvidoPassword;
