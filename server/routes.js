const express = require('express');
const upload = require('multer')({dest: 'uploads/'});
const controller = require('./controller');

const router = new express.Router();

router.get('/', controller.index);
router.post("/validate", upload.array('files', 2), controller.validate);

module.exports = router;
