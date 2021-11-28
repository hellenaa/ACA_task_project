const express = require('express');

const router = express.Router();
const FileController = require('../controllers/file.controller');

router.post('/user/cv', FileController.createCVs.bind(FileController));

router.get('/user/cv', FileController.getCVs.bind(FileController));

module.exports = router;
