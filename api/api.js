var express = require('express');
var router = express.Router();
var guestController = require("../controllers/guest_controller.js");
var customerController = require('../controllers/customer_controller');
var providerController = require('../controllers/provider_controller.js');
var productController = require('../controllers/product_controller.js');
var adminController = require('../controllers/admin_controller');

//api guest

router.post("/signup", guestController.sign_up); 
// router.get('/login/:username/:password', guestController.login);
router.post('/login', guestController.login);
router.get('/search/:keyword', guestController.search_product_by_name);
router.get('/viewproduct/:product_id');
//api customer
router.get('/signout/:username', customerController.sign_out);

router.post('/delete', customerController.deleteAccount);
router.post('/upgrade', customerController.upgradeToProvider);
router.post('/order');
router.post('/editprofile');
router.get('/viewprofile/:username');
router.post('/review/:username/:product_id');
router.get('/viewcart/:username');
router.post('/editcart/')
//api provider
router.post('/resign/:username');
router.post('/addproduct',providerController.add_product);
router.post('/editproduct',providerController.edit_product);
router.post('/removeproduct',providerController.delete_product);
router.post('/confirm');
//moderator

//admin
router.post('/addmod',adminController.add_mod);
router.post('/deletemod',adminController.delete_mod);
router.post('/addcategory',adminController.add_category);
router.post('/editcategory',adminController.edit_category);
router.post('/deletecategory', adminController.delete_category);

//product
router.get('/getallproduct',productController.get_all_product);

module.exports = router;
