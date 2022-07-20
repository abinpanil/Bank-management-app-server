import multer from 'multer';

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./public/uploads/${req.body.id}/`);
    },
});

export const upload = multer({
    storage: fileStorage,
});