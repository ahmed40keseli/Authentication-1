const db = require("../routes/db-config")/*Önceden yapılandırılmış veritabanı bağlantısını modülden içe aktarır (db-config) */
const jwt = require("jsonwebtoken");
const loggedIn = (req, res, next) => {
    if (!req.cookies.userRegistered) return next(); /*İstekte 'userRegistered' adlı çerezin bulunup bulunmadığını kontrol eder. */
    try {
        const decoded = jwt.verify(req.cookies.userRegistered, process.env.JWT_SECRET);  /*Çerez mevcutsa kitaplığı jsonwebtokenve gizli anahtarı ( process.env.JWT_SECRET) kullanarak JWT belirtecini doğrulamaya çalışır. */
        db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, result) => { /* Doğrulama başarılı olursa, kodu çözülmüş kullanıcı kimliğine dayalı olarak kullanıcı bilgilerini almak için veritabanını sorgular.*/
            if (err) return next();/* */
            req.user = result[0];/* */
            return next();/* */
        })
    } catch (err) {
        if (err) return next()/* */
    }
}


module.exports = loggedIn;/*dışa aktararak uygulamanızın diğer bölümlerine aktarılabilmesini ve kullanılabilmesini sağlar. */