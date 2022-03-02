import { response, request } from 'express';



const getVeterinario = async (req = request, res = response) => {


    res.status(200).json({
        msg: 'Veterinarios'
    })


}

const getPerfil = (req = request, res = response) => {

    const { veterinario } = req;


    
    res.status(200).json({
        msg: 'Perfil',
        veterinario
    });
    
}


export {
    getVeterinario,
    getPerfil
}






