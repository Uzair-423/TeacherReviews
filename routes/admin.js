const express = require('express')
const {isAuthenticatedCustom, isAdmin} = require('../middleware/auth')
const Professor = require('../models/Professor')
const router = express.Router();


router.get('/', isAuthenticatedCustom, isAdmin, (req,res) => {
    res.render('admin')
})


router.post('/', isAuthenticatedCustom, (req,res) => {
    //name, email, department, courses taught
    const profModel = new Professor({
        name: req.body.name,
        email: req.body.email,
        department: req.body.department,
        courses: req.body.courses.split(','),
        rating : 0
    })

    profModel.save()
    .then((prof)=>{
        console.log(prof)
        res.redirect('/admin')
    }).catch((err)=>{
        console.log(err)
    })
})





module.exports = router;