const jwt = require("jsonwebtoken");
const db = require("../routes/db-config");
const bcrypt = require('bcryptjs');

const login = async(req,res) =>{
    const {email ,password} = req.body;
    if (!email || !password) return res.json({status:"error", error:"plase enter your email and password"});
    else{
        db.query('SELECT email FROM users WHERE email = ? ',[email], async (Err, result) => {
            if (err) throw Err;
            if (!result[0]  || !await bcrypt.compare(password, result[0].password))return res.json({status:"error", error:"plase enter your email and password"})
            else{
                const token = jwt.sign({id:result[0].id},process.env.JWT_SECRET,{
                    expiresIn:process.env.JWT_EXPIRES,
                    httpOnly:true
                })
                const cookieOptions = {
                    expiresIn: new Date(date.now()+process.env.COOKIE_EXPIRS + 24 * 60 * 60 * 1000),
                    httpOnly:true
                }
            }
        })
    }
}

module.exports = login;