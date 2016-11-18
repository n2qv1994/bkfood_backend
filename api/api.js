var express = require('express');
var router = express.Router();
var guestController = require("../controllers/guest_controller.js");
var customerController = require('../controllers/customer_controller');
var test = require('../test');
//api guest

router.post("/signup", guestController.sign_up); 
// router.get('/login/:username/:password', guestController.login);
router.post('/login', guestController.login);
router.get('/search/:keyword');
router.get('/viewproduct/:product_id');
//api customer
router.get('/signout/:username', customerController.sign_out);
router.post('/delete', customerController.deleteAccount);
router.get('/upgrade:username');
router.get('/order');
router.post('/editprofile/:username');
router.get('/viewprofile:');
//api provider
router.get('/resign/:username');
router.post('/addproduct');
router.post('/editproduct');
router.post('/addproduct');
// router.get('/editproduct');
// router.get('/removeproduct');


module.exports = router;
