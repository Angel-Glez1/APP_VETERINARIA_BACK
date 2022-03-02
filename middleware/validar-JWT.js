import { request, response } from 'express';
import JWT from 'jsonwebtoken'
import { Veterinario } from '../models/index.js';


const validarJWT = async (req = request, res = response, next) => {


    let token;
    const { authorization } = req.headers;

    // Validar que se mande el token y que sea por un bearer
    if (!authorization || !authorization?.startsWith('Bearer')) {
        return res.status(400).json({ ok: false, msg: 'Token no valido' });
    }


    try {

        token = authorization.split(' ')[1];

        const { id } = JWT.verify(token, process.env.SECRET_KEY);
        const user = await Veterinario.findById(id).select("-password -token -confirmado -__v")

        req.veterinario = user;

        // return next();

    } catch (error) {

        return res.status(400).json({ ok: false, msg: 'token-invalido' });
    }


    next();

}



export default validarJWT;


