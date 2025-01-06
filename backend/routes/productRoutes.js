const express = require ('express');
const router = express.Router();
const { getAllProducts,addProduct } = require('../controllers/productControllers');
const {isAdmin,verifyToken} = require('../middlewares/authMiddleware');

console.log('routes');

router.get('/',getAllProducts);


router.post('/', verifyToken,isAdmin, addProduct);


module.exports = router;