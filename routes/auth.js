const express = require('express')
const {isAuthenticatedCustom} = require('../middleware/auth')
const Professor = require('../models/Professor')
const Comment = require('../models/Comment')
const router = express.Router();

router.get('/', isAuthenticatedCustom, (req,res)=>{

    if (req.user.username === 'admin@admin.com'){
        res.redirect('/admin')
    }
    else{
        Professor.find({})
        .then((profs)=>{
            res.render('home', {professors:profs, user:req.user.name})
        })
        .catch(err=>console.log(err))
    }
})

router.get('/logout', isAuthenticatedCustom,(req,res)=>{
    req.logout(err=>console.log(err));
    res.redirect('/login');
})

router.get('/professor/:id', isAuthenticatedCustom, (req,res)=>{

    Professor.findById(req.params.id)
    .then((prof)=>{
        Comment.find({professorId:prof._id}).populate('userId')
        .then((comments)=>{
            console.log(comments)
            res.render('professor', {professor:prof, reviews:comments})
        })
        .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
})

router.post('/professor/:profId', isAuthenticatedCustom, (req,res)=>{
    const commentModel = new Comment({
        userId: req.user._id,
        professorId: req.params.profId,
        body: req.body.body,
        likes: []
    })

    commentModel.save()
    .then((comment)=>{
        console.log(comment)
        res.redirect(`/professor/${req.params.profId}`)
    })
    .catch(err=>console.log(err))
})

module.exports = router;