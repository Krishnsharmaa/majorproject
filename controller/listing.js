const Listing = require("../models/listing.js") 

module.exports.index = (async (req,res)=>{
    const allListing = await Listing.find({});
    res.render("listings/index.ejs",{ allListing})
})
module.exports.new =  (req , res)=>{
    res.render("listings/new.ejs")
}
module.exports.rendershow =  async (req, res)=>{
    let {id}= req.params;
    const listing = await Listing.findById(id).populate({path:"reviews", populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error" , "OOPS! Listing not Exist!")
        res.redirect("/listings")
    }
    console.log(listing)
     res.render("listings/show.ejs", {listing});
}
module.exports.createlisting =async (req, res, next )=>{
    // let {title , description, image, price, country, location} = req.body;
    let url = req.file.path;
    let filename = req.file.filename;
    const newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    newlisting.image = {url, filename };
      await newlisting.save();
     req.flash("success" , "New Listing Created")
     res.redirect("/listings")
 }

 module.exports.editlisting = async (req, res)=>{
    let {id}= req.params;
    const listing = await Listing.findById(id);
    let originalurl = listing.image.url;
     originalUrl =originalurl.replace("/upload", '/upload/h_300,w_250');

res.render("listings/edit.ejs", {listing, originalUrl})

}
module.exports.updatelisting = async(req, res)=>{
    let {id }= req.params;
    let listing = await  Listing.findByIdAndUpdate(id , {...req.body.listing});
 
if(typeof req.file!=="undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename }
   await listing.save();
}
    req.flash("success" , "Listing Updated")
    res.redirect(`/listings/${id}`);
 
 }
module.exports.destroy =  async (req, res)=>{
    let {id }= req.params;
  let dellis = await  Listing.findByIdAndDelete(id);
  req.flash("success" , "Listing Deleted")
    console.log(dellis);
    res.redirect("/listings")
}