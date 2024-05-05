


const router = require('express').Router()

const {createContract,getAllContracts} = require("../controllers/contract")




router.post("/createContract", createContract)
router.get("/allcontracts", getAllContracts);


module.exports=router; 