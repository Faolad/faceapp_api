import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';


import handleRegister from './controllers/register.js'
import handleSignin from './controllers/signin.js'
import profileGet from './controllers/profile.js'
import {imagePut, handleApi}  from './controllers/image.js'

import knex from 'knex'
const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl : { rejectUnauthorized: false },  
      host : process.env.DATABASE_HOST,
      port : 5432,
      user : process.env.DATABASE_USER,
      password : process.env.DATABASE_PW,
      database : process.env.DATABASE_DB
    }
  });

//   db.select('*').from('users').then(data =>{
//     console.log(data);
//   });  

const app = express();


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

// const database = {
//     users: [
//         {
//             id: '123',
//             name: 'fao',
//             email: 'fao@gmail.com',
//             password: 'faolad',
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: '124',
//             name: 'lad',
//             email: 'lad@gmail.com',
//             password: 'ladfao',
//             entries: 0,
//             joined: new Date()
//         }
        
//     ]
// }

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})



app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.profileGet(req, res, db)})

app.put('/image', (req, res) => {image.imagePut(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleApi(req, res)})


app.get('/', (req,res) =>{
    // console.log(req.body)
    res.send(db.users)
} )

app.listen(process.env.PORT);
