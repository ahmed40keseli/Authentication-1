const express = require("express");/*Express.js çerçevesini içe aktarır. */
const loggedIn = require("../controllers/loggedIn")/*'../controllers/loggedIn' bir kullanıcının oturum açıp açmadığını kontrol eder. */
const router = express.Router();/*Yönlendirici rotaları tanımlamak ve gruplamak için kullanılır. */

router.get('/', loggedIn, (req, res) => { /* Kök yol ('/') için bir GET rotası tanımlar , erişilebilir olması gerektiğini belirten ara yazılımı kullanır . */
    if (req.user) {
        res.render('index', { status: "loggedIn", user: req.user });/*Doğruysa, 'dizin' görünümünü "oturum açmış" durumuyla ve kullanıcı ayrıntılarıyla oluşturur.  */
    } else {
        res.render('index', { status: "no", user: "nothing" });/*Değilse, "dizin" görünümünü "hayır" durumuyla ve varsayılan kullanıcı değeri "hiçbir şey"le oluşturur. */
    }
})
router.get('/register', (req, res) => {
    res.sendFile('register.html', { root: './public/' });/*Rota işleyici işlevi yanıt olarak 'register.html' dosyasını gönderir. Dosyanın './public/' dizininde bulunması bekleniyor. */
})
router.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './public/' });/*Rota işleyici işlevi yanıt olarak 'login.html' dosyasını gönderir. Dosyanın './public/' dizininde bulunması bekleniyor. */
})

module.exports = router;/*dışa aktararak uygulamanızın diğer bölümlerine aktarılabilmesini ve kullanılabilmesini sağlar. */