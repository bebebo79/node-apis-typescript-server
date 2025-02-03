import express from 'express';
import router from './router';
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, {swaggerUiOptions} from './config/swagger';
import db from './config/db';
 
// instancia de express
const server = express();

//habilitar conexiones
const corsOption : CorsOptions = {
    origin: function(origin, callback) {
      if(origin === process.env.FRONTEND_URL){
        callback(null, true)
      }else {
        callback(new Error('Error de CORS'))
      }
    }
}

server.use(cors(corsOption))
 
//leer datos de los formularios
server.use(express.json());

//morgan
server.use(morgan('dev'))

//rutas de url
server.use('/api/products', router);
 
//Documentacion
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))


// conexion con la base de datos
export const dbConnect = async () => {
  try {
    await db.authenticate();
    db.sync(); // agrego force para rehacer la sincronización por si la tabla tiene cambios.
    //  console.log(colors.magenta.bold('Successful DATABASE connection'));
  } catch (error) {
    // console.error(error);
    console.log('Hubo un Error al conectar la DB')
  }
};
 
dbConnect();

 
export default server;
 