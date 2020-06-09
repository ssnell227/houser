const bcrypt = require('bcryptjs')

module.exports = {
    getUser: async (req, res) => {
        //maybe I'll need this?!
        const db = req.app.get('db')
        const {username} = req.body
        const user = await db.get_user_by_username(username)
        .catch(err => res.status(404).send(err))
        res.status(200).send(user)
    },
    register: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        const existingUser = await db.get_user_by_username(username)
        if (existingUser[0]) {
            return res.status(400).send('That username has been taken')
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const newUser = await db.create_user(username, hash)
        .catch(err => console.log(err))

        req.session.user = newUser[0]
        delete req.session.user.password
        res.status(201).send(req.session.user)
    },
    login: async (req, res) => {
        
    },
    logout: async (req, res) => {
        
    }
}