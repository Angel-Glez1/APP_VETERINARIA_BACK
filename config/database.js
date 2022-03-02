import mongose from 'mongoose';



const connectDB = async () => {


    try {
        const db = await mongose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const url = `${db.connection.host}:${db.connection.port}`
        console.log('MongoDB conectado en: ', url);

    } catch (error) {
        console.log(`error ${error}`);
        throw new Error('Error al conectarse al la base');

    }

}


export default connectDB