const jwt = require('jsonwebtoken');
const config = require('../configs/auth.config')
const userService = require('../services/user.service')
const bcrypt = require('bcryptjs')

async function login(req, res, next) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            next({statusCode: 401, message: 'Invalid Request Body'})
            return;
        }
        const user = await userService.findUser(username);
        if(!user || !bcrypt.compareSync(password, user.password)) {
            next({statusCode: 401, message: 'Invalid Username Or Passwrod'})
            return;
        }
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            config.jwtSecret,
            { expiresIn: "1h" }
        );
        res.send({data: { token }});
    } catch (err) {
        next(err);
    }
}

async function signUp(req,res, next) {
    const { username, password, fullName } = req.body;
    if (!username || !password || !fullName) {
        next({statusCode: 400, message: 'Invalid Request Body'});
        return;
    }
    try {
        const user = await userService.findUser(username);
        if(user) {
            next({statusCode: 400, message: 'User Already Exist'});
            return;
        }
        const hashPassword = bcrypt.hashSync(password, 8);
        res.json(await userService.createUser({username, password: hashPassword, fullName}));
    } catch (error) {
        next(error)
    }
}

module.exports = {
    login,
    signUp,
  };