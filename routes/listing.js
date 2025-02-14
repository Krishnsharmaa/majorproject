const express = require("express");
const router = express.Router(); 

const WrapAsync = require("../utils/WrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const {listingSchema} = require("../schema.js")
const { loggedin,isowner,validateListing } = require("../middleware.js");
const listingController = require("../controller/listing.js")
const multer  = require('multer')
const {storage} = require("../cloudconfig.js")
const upload = multer({ storage })



router.route("/")
.get(WrapAsync(listingController.index))    // index route 
.post(loggedin, upload.single('listing[image]'), WrapAsync(listingController.createlisting))  //create route
validateListing, 
//new route 
router.get("/new", loggedin,listingController.new)



router.route("/:id")
.get(WrapAsync(listingController.rendershow))  // show route 
.put( loggedin, isowner, upload.single('listing[image]'), validateListing, WrapAsync(listingController.updatelisting))   //update route
.delete(loggedin, isowner, listingController.destroy)  //delete route

//Edit route
 router.get("/:id/edit",loggedin, isowner,  WrapAsync(listingController.editlisting));


 module.exports = router; 


 

// //new route 
// router.get("/new", loggedin,listingController.new)

// // show route 
// router.get("/:id" , WrapAsync(listingController.rendershow))


// //create route

//  //Edit route
//  router.get("/:id/edit",loggedin, isowner,  WrapAsync(listingController.editlisting));

//  //update route
//  router.put("/:id", loggedin, isowner, validateListing, WrapAsync(listingController.updatelisting))

//  //delete route
//  router.delete("/:id", loggedin, isowner, listingController.destroy)

//  module.exports = router; 