const express = require("express");
const router = express.Router(); 
const User = require("../models/user.js");
const WrapAsync = require("../utils/WrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js")
const usercontroller = require("../controller/user.js")


//signup
router.route("/signup")
.get(usercontroller.signuprenderform)
.post( WrapAsync(usercontroller.signup));


//login
router.route("/login")
.get(usercontroller.loginrenderform )
.post(saveRedirectUrl, passport.authenticate("local", {failureRedirect:"/login", failureFlash:true}), usercontroller.login)

//logout
router.get("/logout" , usercontroller.logout)



module.exports = router; 




// //signup
// router.get("/signup",usercontroller.signuprenderform)

// router.post("/signup", WrapAsync(usercontroller.signup));


// //login
// router.get("/login",usercontroller.loginrenderform )

// router.post("/login" ,saveRedirectUrl, passport.authenticate("local", {failureRedirect:"/login", failureFlash:true}), usercontroller.login)

// //logout
// router.get("/logout" , usercontroller.logout)



// module.exports = router; 