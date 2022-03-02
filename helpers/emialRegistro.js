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
                    Que tal ${nombre} nos alegra que te unas a nuestra familia.
                    lo unico que hace falta es que compruebes tu cuenta. 
                    dando click en el siguiente boton
                </p>
        
                <a 
                    style="padding: 2px; text-align: center;  text-transform: uppercase; border: none; background-color: #ec4899"
                    href="${process.env.URL_FRONT}/confirmar/${token}"
                    target="_black"
                >
                    Confirmar cuanta
                </a>
            </div>
        </body>
        </html>
    `;
}



const emialRegistro = async ({ email, nombre, token }) => {

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
            subject: 'Compruba tu cuenta en APV',
            text: 'Comrpueba tu cuenta APV',
            html: bodyHTML(nombre, token)
        })
        
        console.log(`Email enviado correstamente con el id: ${info.messageId}`)
    } catch (error) {
        
    }
    

}


export default emialRegistro;
