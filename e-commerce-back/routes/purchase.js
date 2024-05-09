


const router = require('express').Router()

const {createPurchase} = require("../controllers/purchase")




router.post("/createPurchase", createPurchase)



module.exports=router; 