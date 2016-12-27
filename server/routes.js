const express = require('express');
const upload = require('multer')({ dest: 'uploads/' });
// const formidable = require('formidable');
const controller = require('./controller');

const router = new express.Router();

router.get('/', controller.index);
router.post("/validate", upload.single("canvasImage"), controller.validate);

module.exports = router;
