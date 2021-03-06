var express = require('express');
var router = express.Router();
var passport = require('passport');
// require('../config/passport.js')(passport);

var guestController = require("../controllers/guest_controller.js");
var customerController = require('../controllers/customer_controller.js');
var providerController = require('../controllers/provider_controller.js');
var productController = require('../controllers/product_controller.js');
var moderatorController = require('../controllers/moderator_controller.js');
var adminController = require('../controllers/admin_controller.js');

//api guest
router.post("/signup", guestController.sign_up);
router.post('/login', guestController.login);
router.get('/search/:keyword', guestController.search_product_by_name);
router.get('/searchprovider/:keyword', guestController.search_provider_by_name);

//api customer
router.get('/signout/:username', customerController.sign_out);

router.post('/delete', customerController.deleteAccount);// not done
router.post('/upgrade', customerController.upgradeToProvider);
router.post('/editprofile', customerController.edit_profile);
// router.post('/review/:username/:product_id');
    //api provider
router.post('/resign/:username');
router.post('/addproduct', providerController.add_product);
router.post('/editproduct', providerController.edit_product);
router.post('/removeproduct', providerController.delete_product);



// Manager: Admin and Moderator
//moderator
router.post('/signin', moderatorController.signin); 
router.post('/changepassword', moderatorController.changePassword); 
// xem va xoa cac san pham khong hop le
router.get('/getnewproduct/:category', moderatorController.getNewProduct); //OK
router.post('/deleteproduct', moderatorController.deleteProduct); //OK

router.get('/getallusers', moderatorController.get_all_users);
router.get('/deleteuser/:user_id', moderatorController.delete_user); 
//admin
router.get('/getallmod', adminController.get_all_mod);
router.post('/addmod', adminController.addModerator); //OK
// router.post('/deletemod', adminController.deleteModerator); //OK
router.get('/deletemod/:mod_id', adminController.delete_mod); //OK
router.post('/addcategory', adminController.addCategory); //OK
router.post('/editcategory', adminController.editCategory); //OK
router.post('/deletecategory', adminController.deleteCategory); //OK


//product
router.get('/getallproduct', productController.get_all_product);

router.post('/addproduct', providerController.add_product);


router.get('/removeproduct/:product_id',providerController.delete_product);
router.get('/getproductbyproviderid/:provider_id', productController.get_product_by_provider_id);
router.get('/getproductbycategory/:provider_id/:category', productController.get_product_by_category);

module.exports = router;
