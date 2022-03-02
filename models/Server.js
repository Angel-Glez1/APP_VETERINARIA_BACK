import express from 'express'
import cors from 'cors'
import connectDB from '../config/database.js';
import { Auth, Veterinario, Pacientes } from '../routes/index.js';


class Server {



    constructor() {
        this.app = express();
        

        this.path = {
            auth: '/api/auth',
            veterinario: '/api/veterinario',
            pacientes: '/api/pacientes',
        }

        this.connectDDBB();
        this.middleware();
        this.router();
    }

    router() {

        this.app.use(this.path.auth, Auth);
        this.app.use(this.path.veterinario, Veterinario);
        this.app.use(this.path.pacientes, Pacientes);
    }

    configCors(){

        const dominiosPermtidos = [
            'http://localhost:3000'
        ];

        const corsOptions = {
            origin: function (origin, callback){
                if(dominiosPermtidos.indexOf(origin) !== -1 ){
                    // El origen de la request es permitido
                    callback(null, true);
                }else{
                    callback(new Error('Request bloqueda por cors'));
                }
            }
        }

        return corsOptions;
    }

    
    middleware() {

        
        // this.app.use(cors(this.configCors()));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

    }

    async connectDDBB() {
        await connectDB();
    }



    listen() {
        this.app.set('port', process.env.PORT || 9003);
        this.app.listen(this.app.get('port'), () => {
            console.log(`Servidor corriendo en el puerto ${this.app.get('port')}`);
        })
    }

}


export default Server;
