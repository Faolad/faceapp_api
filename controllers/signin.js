const handleSignin = (req, res,db, bcrypt) =>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json('Fields Can not be empty')
    }
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data =>{
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user =>{
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('Unable to get User'));
            }else{
                res.status(400).json('Wrong Password')
            }
    })
    .catch(err => res.status(400).json('Wrong credentials'))

    // if (req.body.email === database.users[0].email && req.body.password === database.users[0].password){
    //     res.json(database.users[0]);
    // }else{
    //     res.status(400).json('Error')
    // }
    // console.log(req.body)
    // res.send("json")
    
}

module.exports = {
    handleSignin: handleSignin
}