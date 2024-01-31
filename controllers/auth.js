// const express = require('express');
// const register = require('./register')
// const login = require('./login')
// const logout = require('./logout')
// const router = express.Router();

const express = require('express');
const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const router = express.Router();

router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)

console.log("yönlendiriliyoooooooooooor");
module.exports = router;

// const express = require('express');
// const router = express.Router();
// const register = require('./register');
// const login = require('./login');
// const logout = require('./logout');

// router.post('/register', (req, res) => {
//   register(req, res);
// });

// router.post('/login', login);
// router.post('/logout', logout);

// console.log("yönlendiriliyoooooooooooor");
// module.exports = router;