import { request, response } from 'express';
import emialRegistro from '../helpers/emialRegistro.js';
import generarJWT from '../helpers/generarJWT.js';
import { Veterinario } from '../models/index.js';


const registro = async (req = request, res = response) => {

    const { email, nombre } = req.body;


    const issetEmail = await Veterinario.findOne({ email });
    if (issetEmail) {
        res.json({ ok: false, msg: 'Ya exite un usuario con ese email' });
        return;
    }


    try {


        const veterinario = new Veterinario(req.body);
        const resultado = await veterinario.save();


        // Envial email
        await emialRegistro({
            email,
            nombre,
            token: resultado.token
        })

        return res.status(200).json({
            ok: true,
            msg: 'Te mandamos un correo para que confirmes tu cuenta',
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({ ok: false, msg: 'Hubo un error al momento de guargar la informacion' });
    }

}

const confirmar = async (req = request, res = response) => {

    const { token } = req.params;

    try {

        const userConfirm = await Veterinario.findOne({ token });
        if (!userConfirm) {
            return res.status(400).json({ ok: false, msg: 'Error! No exite el token' });
        }

        // Confirmamos la cuenta del token
        userConfirm.token = null;
        userConfirm.confirmado = true;
        await userConfirm.save();

        res.status(200).json({
            ok: true,
            msg: 'Cuenta confirmada'
        });



    } catch (e) {
        console.log(e);
        return res.status(500).json({ ok: false, msg: 'Error! Al confirmar la cuenta', e });
    }



}

const autenticar = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await Veterinario.findOne({ email });
        if (!user) {
            return res.status(401).json({ ok: false, msg: 'No exite registro con ese correo' });
        }

        if (!user.confirmado) {
            return res.status(401).json({ ok: false, msg: 'Tu cuenta no ha sido confirmada' });
        }


        // Validar que los passwords sean correctos.
        const isValidPassword = await user.comprobarPassword(password)
        if (!isValidPassword) {
            return res.status(401).json({ ok: false, msg: 'El password es incorrecto' });
        }

        const token = await generarJWT(user._id);
        const { _id, nombre, email: emailUser } = user;

        return res.status(200).json({
            ok: true,
            msg: 'Login exitoso',
            user: {
                _id,
                nombre: nombre,
                email: emailUser
            },
            token
        });



    } catch (error) {

        console.log(error);
        return res.status(401).json({ ok: false, msg: 'El password es incorrecto' });

    }

}



export default {
    autenticar,
    confirmar,
    registro,
}
