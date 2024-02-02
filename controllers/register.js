const db = require('../routes/db-config');
const bcrypt = require('bcryptjs');

// exports.register = (req, res) => {
//     console.log(req.body);
//     const { name, email, password, passwordConfirm } = req.body;
//     db.query('SELECT email from users WHERE email = ?', [email], async (err, results) => {
//         if (err) {
//             console.log(err);
//         } else {
//             if (results.length > 0) {
//                 return res.sendFile(__dirname + "request.html", {
//                     message: 'The email is already in use'
//                 })
//             } else if (password != passwordConfirm) {
//                 return res.sendFile(__dirname + "request.html", {
//                     message: 'Password dont match'
//                 });
//             }
//         }

//         let hashedPassword = await bcrypt.hash(password, 8);
//         console.log(hashedPassword);

//         db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (err, results) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 return res.sendFile(__dirname + "request.html", {
//                     message: 'User registered'
//                 });
//             }
//         })
//     })
//     res.send("Form submitted");
// }





const register = async (req,res) =>{
    //  console.log(req.body);
    const {email, password:Npassword} = req.body
    // const password = await bcrypt.hash(Npassword, 8);
    if (!email || !Npassword) return res.json({status:"error", error:"plase enter your email and password"});
    else{
        // console.log(email);
        db.query('SELECT email FROM users WHERE email = ?',{email},async (err,result)=>{
            if (err) throw err;
            if (result[0]) return res.json({status:"error",error:"email has already been registered"})
            else{
                const password =await bcrypt.hash(Npassword,8);
                console.log(password);
                db.query('INSERT INTO users SET ?',{email: email,password: password},(error,result) => {
                    if (error) throw error;
                    return res.json({status:"success",success:"user has been registered"})
                })
            }    
        })
    }
b
}

module.exports = register;





// const db = require('../routes/db-config');
// const bcrypt = require('bcryptjs');

// const register = async (req, res) => {
//   const { email, password: Npassword } = req.body;
//   if (!email || !Npassword) return res.json({ status: "error", error: "please enter your email and password" });
//   else {
//     db.query('SELECT email FROM users WHERE email = ?', { email }, async (err, result) => {
//       if (err) {
//         console.error("Error checking if email exists:", err);
//         return res.status(500).json({ status: "error", error: "internal server error" });
//       }
      
//       if (result[0]) return res.json({ status: "error", error: "email has already been registered" });
      
//       try {
//         const hashedPassword = await bcrypt.hash(Npassword, 8);
//         const password = hashedPassword.toString();
        
//         db.query('INSERT INTO users SET ?', { email: email, password: password }, (error, result) => {
//           if (error) {
//             console.error("Error inserting user:", error);
//             return res.status(500).json({ status: "error", error: "internal server error" });
//           }
          
//           return res.json({ status: "success", success: "user has been registered" });
//         });
//       } catch (hashError) {
//         console.error("Error hashing password:", hashError);
//         return res.status(500).json({ status: "error", error: "internal server error" });
//       }
//     });
//   }
// };

// module.exports = register;
