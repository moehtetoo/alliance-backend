const jwt = require('jsonwebtoken');
const config = require('../configs/auth.config')
const userService = require('../services/user.service')
const bcrypt = require('bcryptjs')

async function login(req, res) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(401).send({message: 'Invalid Request Body'});
            return;
        }
        const user = await userService.findUser(username);
        if(!user) {
            res.status(401).send({message: 'Invalid Username Or Passwrod'});
            return;
        }
        if(bcrypt.compareSync(password, user.password)) {
            res.status(401).send({message: 'Invalid Username Or Passwrod'});
            return;
        }
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            config.jwtSecret,
            { expiresIn: "1h" }
        );
        res.send(token);
    } catch (err) {
        res.status(401).send(err);
    }
}

async function signUp(req,res) {
    const { username, password, fullName } = req.body;
    if (!username || !password || !fullName) {
        res.status(400).send({message: 'Invalid Request Body'});
        return;
    }
    try {
        const user = await userService.findUser(username);
        if(user) {
            res.status(400).send({message: 'User Already Exist'});
        }
        const hashPassword = bcrypt.hashSync(password, 8);
        res.json(await userService.createUser({username, password: hashPassword, fullName}));
    } catch (error) {
        res.status(400).send({error})
    }
}

module.exports = {
    login,
    signUp,
  };