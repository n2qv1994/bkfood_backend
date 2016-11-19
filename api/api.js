var express = require('express');
var router = express.Router();
var guestController = require("../controllers/guest_controller.js");
var customerController = require('../controllers/customer_controller');
var providerController = require('../controllers/provider_controller.js');
//api guest

router.post("/signup", guestController.sign_up); 
// router.get('/login/:username/:password', guestController.login);
router.post('/login', guestController.login);
router.get('/search/:keyword');
//api customer
router.get('/signout/:username', customerController.sign_out);
router.get('/delete/:username/:password', customerController.deleteAccount);
router.get('/upgrade:username');
router.get('/order');
router.post('/edit/:username');
router.get('/viewprofile:');
//api provider
router.get('/resign/:username');
router.post('/addproduct',providerController.add_product);
router.post('/editproduct', providerController.edit_product);
router.post('/removeproduct');
// router.get('/editproduct');
// router.get('/removeproduct');

//test


module.exports = router;
