var express = require('express');
var router = express.Router();
var apiController = require('../../controllers/apiController');
var authController = require('../../controllers/authController');

router.get('/', apiController.All_Users);
router.post('/', apiController.create_User);

router.get('/:id', apiController.get_User);
router.put('/:id', apiController.update_User);

router.delete('/:id', apiController.delete_User);

module.exports = router;
