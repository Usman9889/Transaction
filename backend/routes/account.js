const experss = require("express")
const { authMiddleware } = require("../middleware")
const {Account} = require("../db")
const router = experss.Router()
const mongoose = require("mongoose")
//route:api/v1/account/balance

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});

//router:api/v1/account/transfer
router.post('/transfer', authMiddleware, async(req, res)=>{
    const session = await mongoose.startSession()

    session.startTransaction()
    const {amount, to} = req.body

    //Fetch the account within the transaction
    const account = await Account.findOne({userId:req.userId}).session(session)

    if(!account || account.balance<amount){
        await session.abortTransaction()
        return res.status(400).json({
            message:"Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({userId: to}).session(session)

    if(!toAccount){
        await session.abortTransaction()
        return res.status(400).json({
            message:"Invalid account"
        })
    }

    //Perform the transfer
    await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session)
    await Account.updateOne({userId:to},{$inc:{balance: amount}}).session(session)

    //commit the transaction
    await session.commitTransaction()

    res.json({
        message:"transfer successful"
    })
})
module.exports = router