const sql = require('mysql2'); /*mysql kitaplığını dahil ediyoruz*/
const db = sql.createConnection({  /*veritabanı bağlantısı oluşturulur*/ 
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
})

module.exports = db; /*dışa aktararak uygulamanızın diğer bölümlerine aktarılabilmesini ve kullanılabilmesini sağlar. */