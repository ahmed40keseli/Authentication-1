const logout = (req,res) => {

    console.log(logout);
    
    res.clearcookie("userRegistered"); 
    /*Bu, çerezde saklanan kimlik doğrulama belirtecini veya oturum bilgilerini kaldırarak kullanıcının oturumunu etkili bir şekilde kapatır.*/
    res.redirect("/");
    /* Çerezi temizledikten sonra res.redirect("/")kullanıcıyı ana sayfaya ("/") yönlendirme yöntemini kullanır.*/
    
}

module.exports =logout;
/*dışa aktararak uygulamanızın diğer bölümlerine aktarılabilmesini ve kullanılabilmesini sağlar. */