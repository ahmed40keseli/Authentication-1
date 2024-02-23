const jwt = require("jsonwebtoken");
const db = require("../routes/db-config");
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.json({ status: "error", error: "please enter your email and password" });
    else {
        try {
            const result = await db.promise().query('SELECT * FROM users WHERE email = ? ', [email]);
            
            if (!result[0].length || !await bcrypt.compare(password, result[0][0].password)) {
                return res.json({ status: "error", error: "incorrect email or password" });
            } else {
                const token = jwt.sign({ id: result[0][0].id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES,
                });

                const cookieOptions = {
                    expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES + 24 * 60 * 60 * 1000),
                    httpOnly: true
                };

                res.cookie("userRegistered", token, cookieOptions);
                return res.json({ status: "success", success: "user has been logged in" });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ status: "error", error: "internal server error" });
        }
    }
};

module.exports = login;