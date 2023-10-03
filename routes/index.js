const express = require('express');

const passport = require('passport');

const routes = express.Router();

const registerTbl = require('../models/registerTbl');

const flash = require('connect-flash');

const multer = require('multer');

const adminController = require('../controller/adminController')

const cookieParser = require('cookie-parser');

routes.use(cookieParser());

routes.use(flash());


const categoryTbl = require('../models/categoryTbl');
const subcategoryTbl = require('../models/subcategoryTbl');
const productTbl = require('../models/product');

//file uploads

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const fileUpload = multer({ storage: storage }).single('productimage')




routes.use((req, res, next) => {
    res.locals.message = req.flash();
    next();
})

routes.get('/', adminController.index)

routes.get('/register', adminController.register)

routes.post('/loginData', passport.authenticate('local', { failureRedirect: '/' }), adminController.deshboard)

routes.post('/registerData', adminController.registerData)

routes.get('/dashboard', passport.checkAuthentication, adminController.enterDeshboard)

routes.get('/form', adminController.form)

routes.get('/table', adminController.table)

routes.get('/lostpassword', adminController.losepassword)

routes.get('/profile', passport.checkAuthentication, adminController.profile)

routes.post('/profileUpdate', passport.checkAuthentication, adminController.profileUpdate)

routes.get('/changepassword', adminController.changePassword)

routes.post('/postnewpassword', adminController.postPassword)

routes.get('/logout', adminController.logOut)

routes.post('/emailData', adminController.emailData)

routes.get('/otp', adminController.otp)

routes.post('/postOtp', adminController.postOtp)

routes.get('/newpassword', adminController.newPassword)

routes.post('/newpasswordPost', adminController.postnewPassword)

routes.get('/category', passport.checkAuthentication, adminController.category)

routes.get('/addcategory', passport.checkAuthentication, adminController.addCategory)

routes.post('/postCategory', passport.checkAuthentication, adminController.postCategory)

routes.get('/deleteCategory/:id', passport.checkAuthentication, adminController.deletecategory)

routes.get('/subcategory', passport.checkAuthentication, adminController.subcategory)

routes.get('/add_subcategory', passport.checkAuthentication, adminController.addsubCategory)

routes.post('/postSubCategory', passport.checkAuthentication, adminController.postsubCategory)

routes.get('/editsubcategory', passport.checkAuthentication, adminController.editsubCategory)

routes.post('/postEditSubCategory', passport.checkAuthentication, adminController.postEditsubCategory)

routes.get('/deletesubcategory', passport.checkAuthentication, adminController.deletesubCategory)

routes.get('/product', passport.checkAuthentication, adminController.product)

routes.get('/add_product', passport.checkAuthentication, adminController.addProduct)

routes.post('/postProduct', passport.checkAuthentication, fileUpload, adminController.postProduct)



module.exports = routes; 