const express = require('express');
const upload = require('multer')({ dest: 'uploads/' });
const controller = require('./controller');

const router = new express.Router();

router.get('/', controller.index);
router.post("/validate", upload.array('images'), controller.validate);

module.exports = router;
