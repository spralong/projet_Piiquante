const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const router = express.Router();


const sauceCtrl = require('../controllers/sauce');

router.get('/', auth, sauceCtrl.getAllSauce);
router.post('/', auth, multer,  sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.put('/:id', auth, sauceCtrl.modifySauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);



module.exports = router;