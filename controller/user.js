const User = require("../models/user.js");



module.exports.signuprenderform =  (req, res ) =>{
    res.render("./users/signup.ejs")
}


module.exports.signup = async(req, res ) =>{
  try {  
     let {username, email, password } = req.body;
  const newuser  = new User({email, username})
  const regUser = await User.register(newuser, password);
  console.log(regUser);
  req.login(regUser, (err)=>{
    if(err){
        return next(err);
       }
       req.flash("success" , "Welcome to Wanderlust");
       res.redirect("/listings")
  })

}catch(err){
    req.flash("error", err.message);
    res.redirect("/signup")
}
}

module.exports.loginrenderform = (req, res ) =>{
    res.render("./users/login.ejs")
}
module.exports.login = async(req,res)=>{
    req.flash("success", "Welcome back to Wandrlust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    
    res.redirect(redirectUrl);
    }

module.exports.logout = (req, res , next)=>{
    req.logout((err)=>{
        if(err){
         next(err);
        }
    req.flash("success" , "you succesfully logout")
    res.redirect("/listings")
    })
   
}