import { Router } from 'express';
import { getVeterinario, getPerfil } from '../controllers/veterinarioController.js'
import { validarJWT } from '../middleware/index.js';

// El path de estas rutas => /api/veterinario
const router = Router();

router.get('/', getVeterinario);

router.get('/perfil',
    [
        validarJWT
    ],
    getPerfil
);


export default router;