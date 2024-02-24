const db = require('../routes/db-config');/*Önceden yapılandırılmış veritabanı bağlantısını modülden içe aktarır (db-config) */
const bcrypt = require('bcryptjs');/* Parolaları güvenli bir şekilde karma hale getirmek için kullanılan kitaplığı içe aktarır.*/

const register = async (req,res) =>{
    const {email, password:Npassword} = req.body
    if (!email || !Npassword) return res.json({status:"error", error:"plase enter your email and password"}); /*Hem e-postanın hem de şifrenin sağlanıp sağlanmadığını kontrol eder. 
                                                                                                                Değilse, hata mesajı içeren bir JSON yanıtı döndürür. */
    else{
        db.query('SELECT email FROM users WHERE email = ?',{email},async (err,result)=>{/* veri tabanından istenilen veriyi çeker */
            if (err) throw err;/* */
            if (result[0]) return res.json({status:"error",error:"email has already been registered"})/* Sağlanan e-postanın zaten kayıtlı olup olmadığını kontrol etmek için bir veritabanı sorgusu gerçekleştirir. 
                                                                                                         Eğer öyleyse, bir hata yanıtı döndürür.*/
            else{
                const password =await bcrypt.hash(Npassword,8);/*E-posta önceden kayıtlı değilse, bcryptsağlanan şifreyi karma hale getirmek için kullanılır. */
                console.log(password);
                db.query('INSERT INTO users SET ?',{email: email,password: password},(error,result) => {/* Kullanıcının e-postasını ve karma şifresini veritabanına ekler.*/
                    if (error) throw error;/* */
                    return res.json({status:"success",success:"user has been registered"})/*Kayıt işleminin başarısını gösteren bir JSON yanıtı döndürür. */
                })
            } 
        })
    }
}

module.exports = register;/*dışa aktararak uygulamanızın diğer bölümlerine aktarılabilmesini ve kullanılabilmesini sağlar. */