import { request, response } from 'express';
import emialOlvidoPassword from '../helpers/emialOlvidoPassword.js';
import generarID from '../helpers/generarID.js';
import { Veterinario } from '../models/index.js';

const resetPassword = async (req = request, res = response) => {

    const { email } = req.body;

    try {

        const issetEmail = await Veterinario.findOne({ email });

        if (!issetEmail) {
            return res.status(200).json({ ok: false, msg: 'No exite un registro con ese email' });
        }


        issetEmail.token = generarID();
        await issetEmail.save();


        await emialOlvidoPassword({
            email,
            nombre: issetEmail.nombre,
            token: issetEmail.token
        })

        return res.json({
            ok: true,
            msg: 'Hemos enviado un email con las instrucciones.'
        });


    } catch (error) {

        console.log(error);
        return res.json({
            ok: false,
            msg: 'Hubo un error al intertan mandar el email'
        });

    }


}


const comprobarTokenPassword = async (req = request, res = response) => {

    const { token } = req.params;


    const tokenValido = await Veterinario.findOne({ token });
    if (tokenValido) {

        res.status(200).json({ ok: true, msg: 'token-valido' });

    } else {
        return res.status(400).json({
            ok: false,
            msg: 'Token no valido',
        })
    }


}

const nuevoPassword = async (req = request, res = response) => {

    const { token } = req.params;
    const { password } = req.body;

    const tokenValido = await Veterinario.findOne({ token });
    if (!tokenValido) {
        return res.status(400).json({ ok: false, msg: 'Hubo un error' })
    }


    try {
        tokenValido.token = null;
        tokenValido.password = password;
        await tokenValido.save();

        return res.status(200).json({
            ok: true,
            msg: 'password modificado correctamente'
        });

    } catch (error) {
        console.log(error);
    }

}


export default {
    resetPassword,
    comprobarTokenPassword,
    nuevoPassword
}