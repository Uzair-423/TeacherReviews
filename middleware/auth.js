

function isAuthenticatedCustom(req,res,next){
    if (req.isAuthenticated()){
        next();
    }
    else{
        res.redirect('/login');
    }
}

function isAdmin(req, res, next){
    if (req.isAuthenticated && req.user.username === 'admin@admin.com'){
        next();
    }
    else{
        res.redirect('/login')
    }
}

module.exports = {isAuthenticatedCustom, isAdmin};