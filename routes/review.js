const express = require("express");
const router = express.Router({ mergeParams:true}); 
const WrapAsync = require("../utils/WrapAsync.js")
const {validateReview, loggedin, isreviewAuthor} = require("../middleware.js")
const reviewController = require("../controller/review.js")




// review routes 
//create 
router.post("/", loggedin, validateReview, WrapAsync(reviewController.createReview))

//delete
router.delete("/:reviewId", loggedin,isreviewAuthor, WrapAsync(reviewController.destroyReview))

module.exports = router; 