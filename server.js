const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');


const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const knex = require('knex')
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'faolad',
      database : 'faceapp'
    }
  });

//   db.select('*').from('users').then(data =>{
//     console.log(data);
//   });  

const app = express();


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'fao',
            email: 'fao@gmail.com',
            password: 'faolad',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'lad',
            email: 'lad@gmail.com',
            password: 'ladfao',
            entries: 0,
            joined: new Date()
        }
        
    ]
}

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})



app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.profileGet(req, res, db)})

app.put('/image', (req, res) => {image.imagePut(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleApi(req, res)})


app.get('/', (req,res) =>{
    // console.log(req.body)
    res.send(database.users)
} )

app.listen(3000);