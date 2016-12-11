var express = require('express');
var router = express.Router();
var passport = require('passport');
// require('../config/passport.js')(passport);

var guestController = require("../controllers/guest_controller.js");
var customerController = require('../controllers/customer_controller');
var providerController = require('../controllers/provider_controller.js');
var productController = require('../controllers/product_controller.js');
var moderatorController = require('../controllers/moderator_controller.js');
var adminController = require('../controllers/admin_controller.js');

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
router.post('/addproduct', providerController.add_product);
router.post('/editproduct', providerController.edit_product);
router.post('/removeproduct', providerController.delete_product);
router.post('/confirm');

// Manager: Admin and Moderator
//moderator
router.post('/signin', moderatorController.signin); //OK
router.post('/changepassword', moderatorController.changePassword); //OK
// xem va xoa cac san pham khong hop le
router.get('/getnewproduct/:category', moderatorController.getNewProduct); //OK
router.post('/deleteproduct', moderatorController.deleteProduct); //OK

//admin
router.post('/addmod', adminController.addModerator); //OK
router.post('/deletemod', adminController.deleteModerator); //OK
router.post('/addcategory', adminController.addCategory); //OK
router.post('/editcategory', adminController.editCategory); //OK
router.post('/deletecategory', adminController.deleteCategory); //OK

//product
router.get('/getallproduct', productController.get_all_product);

router.post('/addproduct', providerController.add_product);
router.post('/editproduct', providerController.edit_product);
// router.post('/removeproduct',providerController.delete_product);

router.get('/removeproduct/:product_id',providerController.delete_product);
router.get('/getproductbyproviderid/:provider_id', productController.get_product_by_provider_id);
router.get('/getproductbycategory/:provider_id/:category', productController.get_product_by_category);

// //passport
// router.post('/login', passport.authenticate('local-login', { session: true }), function(req,res) {
// 		// res.send("ok");
// 		res.json({ user: req.user });
// });

// router.get('/removeproduct/:product_id', providerController.delete_product);
// router.get('/getproductbyproviderid/:provider_id', isLoggedIn, productController.get_product_by_provider_id);
// router.get('/getproductbycategory/:provider_id/:category', productController.get_product_by_category);

// //passport
// router.post('/login', passport.authenticate('local-login', { session: true }), function(req, res) {
//     // res.send("ok");
//     res.json({ user: req.user });
// });


// function isLoggedIn(req, res, next) {

//     // if user is authenticated in the session, carry on 
//     if (req.isAuthenticated())
//         return next();

//     // if they aren't redirect them to the home page
//     res.redirect('/');
// };

module.exports = router;
