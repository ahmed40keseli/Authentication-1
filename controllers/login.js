// const jwt = require("jsonwebtoken");
// const db = require("../routes/db-config");
// const bcrypt = require('bcryptjs');

// const login = async (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) return res.json({ status: "error", error: "please enter your email and password" });
//      /* E-posta veya şifrenin eksik olup olmadığını kontrol eder. Eğer öyleyse, hatayı belirten bir JSON yanıtı döndürür.  */
//     else {
//         try {
//             const result = await db.promise().query('SELECT * FROM users WHERE email = ? ', [email]);/* veri tabanından veri alır ve promise sayesinde güvenle depolar */
            
//             console.log(result)

//             if (!result[0].length || !await bcrypt.compare(password, result[0][0].password)) {
//                 return res.json({ status: "error", error: "incorrect email or password" });
//                 /* Sağlanan e-postaya sahip bir kullanıcının mevcut olup olmadığını ve sağlanan parolanın veritabanında saklanan karma parolayla eşleşip eşleşmediğini kontrol eder. */
//             } else {
//                 const token = jwt.sign({ id: result[0][0].id }, process.env.JWT_SECRET, {
//                     expiresIn: process.env.JWT_EXPIRES,
//                 });
//                 /*"jwt.sign"Kimlik doğrulama başarılı olursa kullanıcının kimliğini ve belirtilen son kullanma süresini kullanarak bir JWT belirteci oluşturur . */
                
//                 console.log(token)

//                 const cookieOptions = {
//                     expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES + 24 * 60 * 60 * 1000),
//                     httpOnly: true
//                 };

//                 console.log(cookieOptions)

//                 res.cookie("userRegistered", token, cookieOptions);
//                 return res.json({ status: "success", success: "user has been logged in" });/* Oturum açma işleminin başarısını belirten bir JSON yanıtı gönderir. */
//             }
//         } catch (err) {
//             console.error(err);
//             return res.status(500).json({ status: "error", error: "internal server error" });
//             /* Bir hata oluşursa hatayı günlüğe kaydeder, uygun bir durum kodu belirler (dahili sunucu hatası için 500) ve hatayı belirten bir JSON yanıtı gönderir. */
//         }
//     }
// };

// module.exports = login;

const jwt = require("jsonwebtoken");
const db = require("../routes/db-config");
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.json({ status: "error", error: "plase enter your email and password" });
    else {
        db.query('SELECT * FROM users WHERE email = ? ', [email], async (Err, result) => {
            if (Err) throw Err;
            console.log(email)
            if (!result.length || !await bcrypt.compare(password, result[0].password)) return res.json({ status: "error", error: "plase enter your email and password" })
            else {
                const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES
                })
                console.log(token)
                const cookieOptions = {
                    expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRS + 24 * 60 * 60 * 1000),
                    httpOnly: true
                }
                console.log(cookieOptions)
                res.cookie("userRegistered", token, cookieOptions);
                return res.json({ status: "success", success: "user has been logged In" });

            }
        })
    }
}

module.exports = login;