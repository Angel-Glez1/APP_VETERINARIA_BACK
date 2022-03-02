import { Router } from 'express';
import validarJWT from '../middleware/validar-JWT.js';
import{
    getPacientes,
    postPaciente,
    getPacienteByID,
    putPaciente,
    deletePaciente,
} from '../controllers/pacientesController.js';


// Path /api/pacientes
const router = Router();

router.use(validarJWT)


// El metodo route() sirve para indicar que un endpoint va compartir varios metodos
router.route("/")
    .get(getPacientes)
    .post(postPaciente)

router.route("/:id")
    .get(getPacienteByID)
    .put(putPaciente)
    .delete(deletePaciente)


export default router;

