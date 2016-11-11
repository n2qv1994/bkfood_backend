var express = require('express');
var router = express.Router();
var guestController = require("../controllers/guest_controller.js");
//api guest
router.post("/signup", guestController.sign_up); 
router.get('/login/:username/:password', guestController.login);
router.get('/search/:keyword');
//api customer
router.get('/signout/:username');
router.get('/delete/:username');
router.get('/upgrade:username');
router.get('/order');
router.get('/edit/:username');
router.get('/viewprofile:');
//api provider
router.get('/resign/:username');
router.post('/addproduct');
// router.get('/editproduct');
// router.get('/removeproduct');

module.exports = router;