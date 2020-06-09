require('dotenv').config()

const express = require('express'),
    app = express(),
    session = require('express-session'),
    massive= require('massive'),
    postCtrl = require('./postController'),
    authCtrl = require('./authController'),
    {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000*60*60*24},
    secret: SESSION_SECRET
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db)
    console.log('db connected')
    app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}`))
})

//auth endpoints

app.get('/api/auth/user', authCtrl.getUser)

app.post('/api/auth/login', authCtrl.login)

app.post('/api/auth/register', authCtrl.register)

app.post('/api/auth/logout', authCtrl.logout)

