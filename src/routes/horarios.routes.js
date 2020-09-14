import express from 'express';
import HorarioController from '../controllers/HorarioController';
import ImportController from '../controllers/ImportController';
import multer from 'multer';
import uploadConfig from '../config/upload';

const horariosRouter = express.Router();


const upload = multer(uploadConfig);
/**
 * Rota para listagem de todos os horarios
 */
horariosRouter.get('/', HorarioController.indexAll);

horariosRouter.get('/horas/', HorarioController.getHours);

horariosRouter.post('/import', upload.single('schedule'), ImportController.importData);

export default horariosRouter;
