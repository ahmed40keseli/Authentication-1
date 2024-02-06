const logout = (req,res) => {
    res.clearcookie("userRegistered");
    res.redirect("/");
    
}

module.exports =logout;