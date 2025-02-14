// const mongoose = require("mongoose");
// const  initData = require("./data.js");
// const Listing = require("../models/listing.js");

// const mongourl =  'mongodb://127.0.0.1:27017/wanderlust';
// main().then((res)=>{
//     console.log("connect db res")
// }).catch((err)=>{
//     console.log(err)
// })
// async function main(){
//     await mongoose.connect(mongourl)
// }

// const initDB = async ()=>{
//     await Listing.deleteMany({});
//     await Listing.insertMany({initData.data})
//     console.log("data was initialized");

// };


// initDB();
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj)=>({
 ...obj, owner: '67ab35d819f7981d373dfeab',
  }))
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
