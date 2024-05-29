var express = require('express');
var router = express.Router();

var verifyToken = require('../middleware/VerifyToken');
const { getUsers, Register, Login, Logout } = require('../controllers/Users');



router.get('/', verifyToken, getUsers)
router.post('/', Login);
router.post('/registrasi', Register);
router.delete('/logout', Logout);


module.exports = router;
