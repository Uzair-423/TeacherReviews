const express = require('express')
const passport = require('passport')
const router = express.Router();

router.get('/login',(req,res)=>{
    res.render('login')
})

router.post('/login', passport.authenticate('local', {failureRedirect:'/login'}), (req,res)=>{
    res.redirect('/');
})

router.get('/signup', (req,res)=>{
    res.render('signup', {error: ''})
})

router.post('/signup', (req,res)=>{
    console.log(req.body)
    if(req.body.password == '' ||  req.body.name == '' || req.body.email == '' || req.body.major == '' || req.body.class == ''){

        const error = 'All fields are not filled!'
        res.render('signup', {error:error})

    } 
    else{
        User.register({
            name: req.body.name,
            username: req.body.username,
            major: req.body.major,
            class: req.body.class
        },
        req.body.password,
        (err, user)=>{
            if(err){
                console.log(err)
                res.redirect('/signup')
            }
            else{
                res.redirect('/login')
            }
        })
        
    }   
})


module.exports = router;