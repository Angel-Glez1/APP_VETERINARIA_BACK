import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import generarID from '../helpers/generarID.js';



const veterinarioSchame = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telefeno: {
        type: String,
        default: null,
        trim: true
    },
    web: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: generarID()

    },
    confirmado: {
        type: Boolean,
        default: false
    }
});


// Hasear el registro antes de insertar
veterinarioSchame.pre("save", async function(next){

    // Esto evita que un password vuelva a ser haseado 
    if(!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// La propiedad methods me permite crear metodos para mi modelo
veterinarioSchame.methods.comprobarPassword = async function (passwordForm) {
    return await bcrypt.compare(passwordForm, this.password);
}


const Veterinario = mongoose.model('Veterinario', veterinarioSchame)

export default Veterinario;