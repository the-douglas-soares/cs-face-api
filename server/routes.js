const express = require('express');
// const upload = require('multer')({ dest: 'uploads/' });
const controller = require('./controller');

const router = new express.Router();

router.get('/', controller.index);
router.post("/validate", controller.validate);

module.exports = router;
