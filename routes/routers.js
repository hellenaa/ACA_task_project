const express = require('express');

const router = express.Router();
const FileController = require('../controllers/file.controller');

router.post('/user/cv', FileController.createCVs);

router.get('/user/cv', FileController.getCVs);

module.exports = router;
