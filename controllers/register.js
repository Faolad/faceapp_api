const handleRegister  = (req, res, db, bcrypt) =>{
    const {name, email, password} = req.body;
    if(!email || !name || !password){
        return res.status(400).json('Fields Can not be empty')
    }
    const hash = bcrypt.hashSync(password, 1);
    console.log(hash);
    db.transaction(trx =>{
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail =>{
            return trx('users')
                .returning('*')
                .insert({
                    name: name,
                    email: loginEmail[0].email,
                    joined: new Date()
                })
                .then(user =>{
                    res.json(user[0])
                })
        })
        .then(trx.commit)
        .catch(trx.rollback)    
    })
    .catch(err => res.status(400).json('unaible to register'))
}

export default handleRegister;