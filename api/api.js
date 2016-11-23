var express = require('express');
var router = express.Router();
var guestController = require("../controllers/guest_controller.js");
var customerController = require('../controllers/customer_controller');
var providerController = require('../controllers/provider_controller.js');
var productController = require('../controllers/product_controller.js');

//api guest

router.post("/signup", guestController.sign_up); 
// router.get('/login/:username/:password', guestController.login);
router.post('/login', guestController.login);
router.get('/search/:keyword', guestController.search_product_by_name);
// router.get('/viewproduct/:product_id');
//api customer
router.get('/signout/:username', customerController.sign_out);

router.post('/delete', customerController.deleteAccount);
router.post('/upgrade', customerController.upgradeToProvider);
router.post('/order');
router.post('/editprofile', customerController.edit_profile);
router.get('/viewprofile/:username');
router.post('/review/:username/:product_id');
router.get('/viewcart/:username');
router.post('/editcart/')
//api provider
router.post('/resign/:username');
router.post('/confirm');
//moderator

//admin
router.post('/addmod');
router.post('/deletemod');
router.post('/addcategory');
router.post('/editcategory');
router.post('/deletecategory');

//product
router.get('/getallproduct',productController.get_all_product);
router.post('/addproduct',providerController.add_product);
router.post('/editproduct',providerController.edit_product);
router.post('/removeproduct',providerController.delete_product);

module.exports = router;
