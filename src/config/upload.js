import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolter = path.resolve(__dirname, '..', '..', 'tmp');

export default {
    directory: tmpFolter,
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'tmp'),
        filename: (request, file, callback) => {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        },
    }),
};