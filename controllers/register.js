const db = require('../routes/db-config');/*Önceden yapılandırılmış veritabanı bağlantısını modülden içe aktarır (db-config) */
const bcrypt = require('bcryptjs');/* Parolaları güvenli bir şekilde karma hale getirmek için kullanılan kitaplığı içe aktarır.*/

const register = async (req, res) => {
    const { email, password: Npassword } = req.body
    if (!email || !Npassword) return res.json({ status: "error", error: "plase enter your email and password" }); /*Hem e-postanın hem de şifrenin sağlanıp sağlanmadığını kontrol eder. 
                                                                                                                Değilse, hata mesajı içeren bir JSON yanıtı döndürür. */
    else {
        console.log("email");
        console.log(email);
        db.query('SELECT email FROM users WHERE email = ?', [email], async (err, result) => {
            console.log("where sorgusu bitti");
            if (err) throw err;
        
            console.log("result");
            console.log(result);
            console.log("result");

        
            if (result.length > 0) {
                console.log("if'e girdi");
                return res.json({ status: "error", error: "email has already been registered" });
            } else {
                console.log("else'e girdi");
                console.log(Npassword);
                const password = await bcrypt.hash(Npassword, 8); // şifreyi şifreleyen kod
        
                console.log(password);
                db.query('INSERT INTO users SET ?', { email: email, password: password }, (error, result) => {
                    if (error) throw error;
                    return res.json({ status: "success", success: "user has been registered" });
                });
            }
        });
        
    }
}

module.exports = register;/*dışa aktararak uygulamanızın diğer bölümlerine aktarılabilmesini ve kullanılabilmesini sağlar. */