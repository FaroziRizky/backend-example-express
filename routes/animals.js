var express = require('express');
var router = express.Router();
var verifyToken = require('../middleware/VerifyToken');
const { getAnimals, getAnimalById, addAnimal, updateAnimal, deleteAnimal } = require('../controllers/Animals');

router.get('/', verifyToken, getAnimals)
router.get('/:id', verifyToken, getAnimalById)
router.post('/', verifyToken, addAnimal)
router.put('/:id', verifyToken, updateAnimal)
router.delete('/:id', verifyToken, deleteAnimal)

module.exports = router;