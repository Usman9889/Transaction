const express = require('express')
const zod = require('zod')
const router = express.Router()
const {User, Account} = require('../db')
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require('../config')
const {authMiddleware} = require('../middleware')


//signup route
const signupBody = zod.object({
    username:zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string()
})

router.post('/signup', async (req,res)=>{
    const {success} = signupBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message:"Input Invalid"
        })
    }

    const existingUser = await User.findOne({
        username:req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            message: "Email already exists"
        })
    }

    const user = await User.create({
        username:req.body.username,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password
    })
    const userId = user._id

    /// Create new Account---
    await Account.create({
        userId,
        balance: 1 + Math.random()*10000
    })
    ///------------

    // const token = jwt.sign({
    //     userId
    // },JWT_SECRET)

    res.json({
        message:"User successfully created",
        // token: token
    })
})

//signin route
const signinBody = zod.object({
    username:zod.string().email(),
    password:zod.string()
})

router.post("/signin", async(req, res)=>{
    const {success} = signinBody.safeParse(req.body)

    if(!success){
        return res.status(411).json({
            message: "Emial already taken / Incorrect input"
        })
    }

    const user = await User.findOne({
        username : req.body.username,
        password : req.body.password
    })
    
    if(user){
        const token = jwt.sign({
            userId : user._id
        }, JWT_SECRET)
        
    res.json({
        token : token,
        name: `${user.lastName}`        
        })
        return;
    }   

    res.status(411).json({
        message:"Error while logging in"
    })
})

// update route
const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })
})

//route for filter user
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router