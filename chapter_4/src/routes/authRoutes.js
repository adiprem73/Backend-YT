import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js' 


const router = express.Router()

// Register a new user enpoint /auth/register
router.post('/register', async (req,res) => {
    const {username, password} = req.body //we want to get access to the json of the incoming requested user details

    //save username and password is encrypted (this encription is irreversible)

    // encrypt the password
    const  hashedPassword = bcrypt.hashSync(password, 8);
    
    try{
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        })

        // now that we have a yser i want to add their first todo for them
        const defaultTodo = `Hello! Add your first todo :)`
        await prisma.todo.create({
            data: {
                task: defaultTodo,
                userId: user.id
            }
        })

        // create a token: tokens will be used later to confirm infact they are the correct user or not
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.json({token})
    }catch (err){
        console.log(err.message)
        res.sendStatus(503);
    }

})

router.post('/login', async (req,res) => {
    // we get their email, we look up the password associated witht eh email in the database
    // but we get it back and see its encrypted, which means that we cannot compare it tot he onw the user just used trying to login
    // so what we can to is again one way ecnrypt the passwprd the  user just entered

    const {username, password}= req.body
    try{
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })
        // if the username is not found then we reutrn fromt he functions 
        if(!user){return res.status(404).send({message: "User not found"})}


        const passwordIsValid = bcrypt.compareSync(password, user.password)
        // if the password does not match, return out the function
        if(!passwordIsValid) {return res.status(401).send({message: "Invalid password"})}
        console.log(user)
        // then we have a successful authentication
        const token = jwt.sign({id : user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})

        res.json({token})
    }catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }
})

export default router