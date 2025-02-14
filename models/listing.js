// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const listingSchema = new Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     description: String,
//     image: {
//         type: String,
//         set: (v) => (v === "" ? "http" : v),
//     },
//     Price: Number, // Changed to lowercase to match `app.js`
//     location: String,
//     country: String, // Changed to lowercase to match `app.js`
// });

// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;


// const  mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const listingSchema = new Schema({
//     title: {
//         type: String,
//         required: true,},
//     description: String,
//     image: {
//         type: String,

//         default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fresort%2F&psig=AOvVaw26AIVfCejTHQ1kYD1_aYfr&ust=1735275117866000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLj4t9nRxIoDFQAAAAAdAAAAABAE",
//         set : (v) =>( v === ""? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fresort%2F&psig=AOvVaw26AIVfCejTHQ1kYD1_aYfr&ust=1735275117866000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLj4t9nRxIoDFQAAAAAdAAAAABAE": v)
//         },
//     price: Number,
//     location: String,
//     country: String,
// });
// const Listing = mongoose.model("Listing", listingSchema);
//  module.exports = Listing;
 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },

// image: {
//     filename: { type: String },
//     url: { type: String,
//         default:
//             "https://images.pexels.com/photos/261204/pexels-photo-261204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           set: (v) =>
//             v === ""
//               ? "https://images.pexels.com/photos/261204/pexels-photo-261204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//               : v,
//     }
//   },
// image: {
//   type: String,
//   default:
//     "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//   set: (v) =>
//     v === ""
//       ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
//       : v,
// },
image: {
  url:String,
  filename: String,
},
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
reviews : [
  {
    type: Schema.Types.ObjectId,
    ref: "Review",
  }
],
owner:{
  type:Schema.Types.ObjectId,
  ref: "User",
},
  
});
listingSchema.post("findOneAndDelete" , async(listing)=>{
  if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}})
  }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
