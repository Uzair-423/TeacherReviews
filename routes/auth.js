const express = require('express')
const isAuthenticatedCustom = require('../middleware/auth')
const router = express.Router();

router.get('/', isAuthenticatedCustom, (req,res)=>{
    console.log(req.user)
    res.render('home', {user:req.user.name})
    // res.send('home')
})


router.get('/logout', isAuthenticatedCustom,(req,res)=>{
    req.logout(err=>console.log(err));
    res.redirect('/login');
})

module.exports = router;