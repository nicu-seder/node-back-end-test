const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const register = require('./controllers/register');
const {handleRegister} = register;

const signin = require('./controllers/signin');
const {handleSignIn} = signin;

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'nicu',
        password: '231990',
        database: 'smart-brain'
    }
});

// db.select('*').from('users').then(data=>{
//     console.log(data);
// })

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/signin', (req, res) =>
    handleSignIn(db, bcrypt)(req, res)
)

app.post('/register', (req, res) => {
        handleRegister(db, bcrypt)(req, res);
    }
)

app.listen(3005, () => {
    console.log('I am listening');
});