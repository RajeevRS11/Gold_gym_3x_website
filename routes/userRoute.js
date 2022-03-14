const express = require('express');
const userRoute = express();
const session = require('express-session');

const config = require('../config/config');
userRoute.use(session({secret:config.sessionSecret, resave:true, saveUninitialized:true}));

const auth = require('../middleware/auth');

const bodyParser = require('body-parser');
userRoute.use(bodyParser.json());
userRoute.use(bodyParser.urlencoded({extended:true}));

userRoute.set('view engine', 'pug');
userRoute.set('views','./templates');
userRoute.use('/static', express.static('public'));

const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, path.join(__dirname, '../public/userImages'));
    },
    filename:(req,file,cb)=>{
        const name = Date.now()+'-'+file.originalname;
        cb(null, name);
    }
});
const upload = multer({storage:storage});

const userController = require("../controllers/userController");
userRoute.get('/register',auth.isLogout, userController.loadRegister);

userRoute.post('/register', upload.single('image'),userController.insertUser);

// mail
userRoute.get('/verify',userController.verifyMail);

// user login
userRoute.get('/',auth.isLogout, userController.loginLoad);
userRoute.get('/login',auth.isLogout, userController.loginLoad);
userRoute.post('/login', userController.verifyLogin);

userRoute.get('/home',auth.isLogin, userController.loadHome);

userRoute.get('/logout', auth.isLogin, userController.userLogout);

module.exports = userRoute;
