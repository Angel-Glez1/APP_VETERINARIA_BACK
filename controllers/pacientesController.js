import { response, request } from "express"
import { Paciente } from "../models/index.js";


const getPacientes = async (req = request, res = response) => {


    const { _id: id } = req.veterinario;

    const pacientes = await Paciente.find()
        .where({ veterinario_id: id })
        .populate('veterinario_id', 'nombre')
        .select(" -createdAt -updatedAt -__v ");


    return res.status(200).json({ ok: true, pacientes });

}


const getPacienteByID = async (req = request, res = response) => {

    const { params, veterinario } = req;
    const { id } = params;


    try {


        const paciente = await Paciente.findById(id);

        if (!paciente) {
            return res.json({
                ok: false,
                msg: 'Sin resultado'
            });
        }

        if (paciente?.veterinario_id.toString() !== veterinario._id.toString()) {
            return res.status(401).json({
                ok: true,
                msg: 'No tienes autorizacion para esta accion'
            });
        }


        return res.json({ ok: true, paciente: paciente });


    } catch (error) {
        console.log(error);
        return res.json({ ok: false, msg: 'Error! al mostar el paciente' })
    }

}


const postPaciente = async (req = request, res = response) => {

    const { _id: id } = req.veterinario;
    const { veterinario_id, ...resto } = req.body;


    try {


        const paciente = new Paciente({ veterinario_id: id, ...resto });
        const resultado = await paciente.save();

        return res.status(200).json({
            ok: true,
            msg: 'Nuevo paciente creado con exito',
            paciente: resultado
        });

    } catch (error) {

        console.log(error);
        console.log({ ok: false, msg: 'Error! al guardar al paciente' });
    }



}


const putPaciente = async (req = request, res = response) => {

    const { params, veterinario } = req;
    const { id } = params;

    try {

        const paciente = await Paciente.findById(id);

        if (!paciente) {
            return res.json({ ok: false, msg: 'Sin resultado' });
        }

        if (paciente?.veterinario_id.toString() !== veterinario._id.toString()) {
            return res.status(401).json({ ok: true, msg: 'No tienes autorizacion para esta accion' });
        }


        try {

            const pacienteUpdated = await Paciente.findByIdAndUpdate(id, { ...req.body }, { new: true });
            return res.status(201).json({ ok: true, paciente: pacienteUpdated });

        } catch (error) {

            console.log(error);
            return res.status(500).json({ ok: false, msg: 'Error! Al itentar Actulizar el paciente' });

        }



    } catch (error) {
        console.log(error);
        return res.json({ ok: false, msg: 'Error! al mostar el paciente' })
    }

}


const deletePaciente = async (req = request, res = response) => {


    const { params, veterinario } = req;
    const { id } = params;


    const paciente = await Paciente.findById(id);
    if (!paciente) {
        return res.json({ ok: false, msg: 'Sin resultado' });
    }


    if (paciente?.veterinario_id.toString() !== veterinario._id.toString()) {
        return res.status(401).json({ ok: true, msg: 'No tienes autorizacion para esta accion' });
    }

    try {

        // Eliminarlo
        await paciente.deleteOne();
        return res.json({ ok: true, msg: 'Paciente eliminado' });


    } catch (error) {

        console.log(error);
        return res.status(500).json({ ok: false, msg: 'Error! al borrar el elemnto' });

    }
}


export {
    getPacientes,
    postPaciente,
    getPacienteByID,
    putPaciente,
    deletePaciente,
}
