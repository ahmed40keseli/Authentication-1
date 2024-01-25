// const db = require('../routes/db-config');
// const bcrypt = require('bcryptjs');

// const register = async (req,res) =>{
//     const {email, password:Npassword} = req.body
//     if (!email || !password) return res.json({status:"error", error:"plase enter your email and password"});
//     else{
//         db.query('SELECT email FROM users WHERE email = ?',{email},async (err,result)=>{
//             if (err) throw err;
//             if (result[0]) return res.json({status:"error",error:"email has already been registered"})
//             else{
//                 const password = bcrypt.hash(Npassword,8);
//                 db.query('INSERT INTO users SET ?',{email: email,password: password},(error,result)=>{
//                     if (error) throw error;
//                     return res.json({status:"success",success:"user has been registered"})
//                 })
//             }    
//         })
//     }

// }

// module.exports = register;


const db = require('../routes/db-config');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const { email, password: Npassword } = req.body;
    if (!email || !password) return res.json({ status: "error", error: "please enter your email and password" });
    else {
        db.query('SELECT email FROM users WHERE email = ?', { email }, async (err, result) => {
            if (err) throw err;
            if (result[0]) return res.json({ status: "error", error: "email has already been registered" });
            else {
                const hashedPassword = await bcrypt.hash(Npassword, 8);
                db.query('INSERT INTO users SET ?', { email: email, password: hashedPassword }, (error, result) => {
                    if (error) throw error;
                    return res.json({ status: "success", success: "user has been registered" });
                });
            }
        });
    }
};

module.exports = register;
