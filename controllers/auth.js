const User = require('../models/User');

const  Home = (req,res)=>{
  res.render('home',{success:res.locals.success,error:res.locals.error});
}

const About = (req,res)=>{
  res.render('about');
}

const Contact = (req,res)=>{
  res.render('contact');
}


const Signup = (req,res)=>{
  res.render('auth/signUp',{success:res.locals.success,error:res.locals.error})
}

const Adduser = async(req,res)=>{
  let{username,email,password,confirmpassword,role} = req.body;
  
  if(password!=confirmpassword){
    req.flash('error','Write correct password');
    return res.redirect('/signup');
  }else{
    try{
      const user = new User({ username, email ,role});
      await User.register(user, password);
      req.flash('success','user Signed in Successful')
  
      // res.redirect('/login')
  
      req.login(user,(err)=>{
        if(err){return next(err)}
        req.flash('success','user signed up successful')
        return res.redirect('/')
      })
    }catch(e){    
      req.flash('error',e.message)
      res.redirect('/signup')
    }
  }
  }
const Login = (req,res)=>{
  res.render('auth/login',{success:res.locals.success,error:res.locals.error})
}

module.exports = {Home,About,Contact,Signup,Adduser,Login}