import { Router } from 'express';
import horariosRouter from './horarios.routes';

const routes = Router();

routes.get('/', (request, response) => {
    response.json({
        message: 'Hello World! 🌎',
    });
});
routes.use('/horarios', horariosRouter);


export default routes;