import { Router } from "express";
import multer from "multer";
import fs from 'fs';

const router = Router();

const upload = multer({ dest: 'uploads/'});

router.post('/image', upload.single('imagenPerfil'), (req, res) => {
    console.log(req.file);
    saveImage(req.file);
    res.send('Final');
});

router.post('/images', upload.array('imagenPerfil', 10), (req, res) => {
    req.files.map(saveImage)
    res.send('Final');
});

function saveImage(file) {
    const newPath = `./uploads/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    return newPath;
}

export default router;