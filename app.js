require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const User = require('./models/User')

const app = express()

const noAuthRouter = require('./routes/noAuth')
const authRouter = require('./routes/auth')
const adminRouter = require('./routes/admin')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')


// Authentication Middleware
app.use(session({
    secret: process.env.SESSION_STRING,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {dbName:'teacher-rating'}).then(console.log('MongoDB connected')).catch(err=>console.log(err));



app.use('/', noAuthRouter)

app.use('/', authRouter)

app.use('/admin', adminRouter)



app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
});