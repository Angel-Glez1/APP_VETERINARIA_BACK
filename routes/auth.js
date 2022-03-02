import { Router } from 'express';
import { default as controller } from '../controllers/index.js';
const {
    resetPassword,
    comprobarTokenPassword,
    nuevoPassword,
    confirmar,
    registro,
    autenticar
} = controller;

// TODO :: Path de la ruta <host>/api/auth
const router = Router();


router.post('/login', autenticar);
router.post('/registro', registro);
router.get('/confirmar/:token', confirmar);

// Estas rutas son para cuando un usuario olvido su contraseña
router.post('/resetPassword', resetPassword);
router.get('/resetPassword/:token', comprobarTokenPassword);
router.post('/resetPassword/:token', nuevoPassword);


export default router;
