import JWT from 'jsonwebtoken'

const generarJWT = (id) => {
    return new Promise((resolve, reject) => {

        const payload = { id }
        const config = { expiresIn: '30d' };
        


        JWT.sign(
            payload,
            process.env.SECRET_KEY,
            config,
            (error, token) => {

                console.log(error);
                
                if(error){
                    reject('No se logro generar el JWT');
                }else{
                    resolve(token);
                }

            }
        )

    });


}


export default generarJWT;

