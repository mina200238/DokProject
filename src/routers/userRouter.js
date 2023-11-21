const { Router } = require('express');
const userController = require('../controllers/userController');

const router = Router();

router.post('/signUp', userController.signUp);
router.post('/signIn', userController.signIn);

module.exports = router;
