const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const saltRounds = 10

const userController = {
    signup: async (req, res, next) => {
        const userReq = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }

        if(!userReq.username || !userReq.password){
            return res.status(400).json('Enter the required fields!')
        }

        //CHECK EMAIL / USERNAME

        //HASH PASSWORD
        bcrypt.hash(userReq.password, saltRounds, async (err, hash)=>{
            if(err){
                return res.status(400).json('bcrypt error')
            }
            await userModel.create({
                Username: userReq.username,
                Password: hash,
                Email: userReq.email
            })
            .then((newUser)=>{
                return res.status(200).json({
                    username: newUser.Username,
                    email: newUser.Email
                })
            })
            .catch(error=>{
                return res.status(400).json(error)
            })
        })
    },
    login: async (req, res, next) => {
        const userReq = {
            username: req.body.username,
            password: req.body.password
        }

        if(!userReq.username || !userReq.password){
            return res.status(400).json("Enter the required fields!")
        }

        // FIND USER BY USERNAME
        await userModel.findOne({where:{Username:userReq.username}})
        .then(userDB => {
            if(!userDB){
                return res.status(400).json("User does not existed!")
            }
    
            bcrypt.compare(userReq.password, userDB.Password)
            .then((result) =>{
                if(!result){
                    return res.status(400).json("Wrong password!")
                }

                const token = jwt.sign({
                    username: userDB.Username, password: userDB.Password
                },
                process.env.PRIVATE_KEY,
                {
                    expiresIn: "1h"
                })

                return res.status(200).json({
                    username: userDB.Username,
                    token: token
                })
            })
            .catch(error =>{
                return res.status(400).json("Bcrypt error: ", error)
            })
        })
        .catch(error => {
            return res.status(400).json(error)
        })
    }
}

module.exports = userController