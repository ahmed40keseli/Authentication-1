const express = require('express');/* Express.js çerçevesini içe aktarır.*/
const register = require('./register');/* */
const login = require('./login');/* */
const logout = require('./logout');/* */
const router = express.Router();/* Yönlendirici rotaları tanımlamak ve gruplamak için kullanılır. */

router.post('/register',register)/* '/register' yolu için POST rotası tanımlar.*/
router.post('/login',login)/* '/login' yolu için POST rotası tanımlar. */
router.post('/logout',logout)/* '/logout' yolu için POST rotası tanımlar. */

module.exports = router;/*dışa aktararak uygulamanızın diğer bölümlerine aktarılabilmesini ve kullanılabilmesini sağlar. */

/*Özetle, bu modül üç POST rotasına sahip bir Express yönlendirici kurar: 
'/register', '/login' ve '/logout'. Her rota , muhtemelen karşılık gelen HTTP isteklerini işlemeye yönelik uygulamayı içeren ayrı bir modülle ( register, login, ) ilişkilendirilir .
Kullanıcı kaydı, oturum açma ve oturum kapatmanın gerçek mantığı sırasıyla , ve logoutmodüllerinde tanımlanacaktır .register .jslogin .jslogout.js*/
