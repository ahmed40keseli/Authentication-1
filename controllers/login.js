const jwt = require("jsonwebtoken");
const db = require("../routes/db-config");
const bcrypt = require('bcryptjs');

// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         if (!email || !password) {
//             return res.status(400).sendFile(__dirname + "/login.html", {
//                 message: "Please Provide an email and password"
//             })
//         }
//         db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
//             console.log(results);
//             if (!results || !await bcrypt.compare(password, results[0].password)) {
//                 res.status(401).sendFile(__dirname + '/login.html', {
//                     message: 'Email or Password is incorrect'
//                 })
//             } else {
//                 const id = results[0].id;

//                 const token = jwt.sign({ id }, process.env.JWT_SECRET, {
//                     expiresIn: process.env.JWT_EXPIRES_IN
//                 });

//                 console.log("the token is " + token);

//                 const cookieOptions = {
//                     expires: new Date(
//                         Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
//                     ),
//                     httpOnly: true
//                 }
//                 res.cookie('userSave', token, cookieOptions);
//                 res.status(200).redirect("/");
//             }
//         })
//     } catch (err) {
//         console.log(err);
//     }
// }



const login = async(req,res) =>{
    const {email ,password} = req.body;
    // const hashedPassword = bcrypt.hash(password, 8);
    if (!email || !password) return res.json({status:"error", error:"plase enter your email and password"});
    else{
        db.query('SELECT email FROM users WHERE email = ? ',[email], async (Err, result) => {
            if (Err) throw Err;
            if (!result.length  || !await bcrypt.compare(password, result[0].password))return res.json({status:"error", error:"plase enter your email and password"})
            else{
                const token = jwt.sign({id:result[0].id},process.env.JWT_SECRET,{
                    expiresIn: process.env.JWT_EXPIRES,
                    httpOnly: true
                })
                const cookieOptions = {
                    expiresIn: new Date(date.now()+process.env.COOKIE_EXPIRS + 24 * 60 * 60 * 1000),
                    httpOnly:true
                }
                res.cookie("userRegistered",token ,cookieOptions);
                return res.json({status:"success" , success:"user has been logged In"});

            }
        })
    }
}

module.exports = login;