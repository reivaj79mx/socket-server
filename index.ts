import Server from "./classes/server";
import router from "./routes/router";
import bodyparser from "body-parser";
import cors from 'cors';

const server = new Server;

// body parser
server.app.use(bodyparser.urlencoded({ extended: true }));
server.app.use(bodyparser.json());

// cors
server.app.use(cors({origin: true, credentials: true}));

// routes
server.app.use('/', router);

server.start(() => {
  console.log(`Servidor corriendo en el puerto: ${ server.port }`);
})