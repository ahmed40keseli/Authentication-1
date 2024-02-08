const express = require('express'); /*Express.js çerçevesini içe aktarır. */
const db = require('./routes/db-config') /*Önceden yapılandırılmış veritabanı bağlantısını modülden içe aktarır (db-config) */
const app = express(); /*Express uygulamasının bir örneğini başlatır. */
const cookie = require('cookie-parser');/*Çerezleri işlemek için ara yazılımı içe aktarır. */
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/js' , express.static(__dirname + '/public/js'));/* Express'i, belirtilen dizinlerden ( /public/js) statik dosyalar (JavaScript ve CSS) sunacak şekilde yapılandırır*/
app.use('/css' , express.static(__dirname + '/public/css'));/* Express'i, belirtilen dizinlerden (/public/css) statik dosyalar (JavaScript ve CSS) sunacak şekilde yapılandırır*/

app.set('view engine','ejs');/* EJS görüntüleme motorunu ayarlar ve.*/
app.set('views','./views');/* ./viewsEJS şablonlarının saklandığı dizini ( ) belirtir.*/

app.use(cookie());/* cookie-parser Çerez başlığını ayrıştırmak ve ayrıştırılan çerezleri içinde kullanılabilir hale getirmek için ara yazılımı uygular req.cookies. */
app.use(express.json());/* Gelen JSON isteklerini ayrıştırmak ve ayrıştırılan verileri req.body.*/
db.connect((err)=>{
    if (err) throw err;
})
app.use('/', require('./routes/pages'))/*  Kök yol ('/') için yönlendirmeyi ayarlar. Gerçek rota işleme mantığı muhtemelen modülde tanımlanmıştır pages.*/
app.use('/api', require('./controllers/auth'))/* '/api' yolu için yönlendirmeyi ayarlar ve authkimlik doğrulamayla ilgili rotaları yönetmek için modülü kullanır.*/
app.listen(PORT);/*varsayılan olarak 5000 numaralı bağlantı noktasına ayarlanır . */