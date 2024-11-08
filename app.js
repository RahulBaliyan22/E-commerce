const express  = require('express');
const path = require('path');
const mongoose = require('mongoose');
const seedDb = require('./seed');
const bodyParser = require('body-parser')
const {router : productRouter} = require('./routes/product');
const methodOverride = require('method-override')
const reviewRoutes = require('./routes/review');
const cartRoutes = require('./routes/cart')


const session = require('express-session');
const flash = require('connect-flash');
const authRoutes = require('./routes/auth');
const passport = require('passport');
const LocalStrategy = require('passport-local')
const User = require('./models/User')


const app = express();

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie:{
    httpOnly:true,
    expires:Date.now()+7*24*60*60*1000,
    maxAge: 7*24*60*60*1000
  }
}));

app.use(flash());



// day 2

const ejsMate = require('ejs-mate')

mongoose.connect('mongodb://127.0.0.1:27017/Shopping').then(()=>{console.log(`Connected to DataBase`)}).catch((err)=>{console.log(`DataBase Error: ${err}`)})

//views folder
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('ejs',ejsMate); // default -> ejs-mate

//body parsers
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(methodOverride('_method'))

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

//passport use
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});
app.use(express.static(path.join(__dirname,'public')))
//seed data
// seedDb()
app.use(productRouter);//har incoming reques ke liye file check ho
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);
//public folder


const PORT = 8080;
app.listen(PORT,()=>{
  console.log(`connected to PORT : ${PORT}`)
});