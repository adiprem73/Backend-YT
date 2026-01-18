import express from 'express'
import bcrypt from 'bcryptjs'
import jst from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()

// Register a new user enpoint /auth/register
router.post('/register', (req,res) => {
    const {username, password} = req.body //we want to get access to the json of the incoming requested user details

    //save username and password is encrypted (this encription is irreversible)

    // encrypt the password
    const  hashedPassword = bcrypt.hashSync(password, 8);
    
    try{
        const insertUser = db.prepare(``)
    }catch (err){
        console.log(err.message)
        res.sendStatus(503);
    }

})

router.post('/login', (req,res) => {
    // we get their email, we look up the password associated witht eh email in the database
    // but we get it back and see its encrypted, which means that we cannot compare it tot he onw the user just used trying to login
    // so what we can to is again one way ecnrypt the passwprd the  user just entered
})

export default router