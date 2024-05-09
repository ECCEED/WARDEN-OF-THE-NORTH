const mongoose = require("mongoose")



const claimSchema = new mongoose.Schema({
    
    vol: { type: Boolean, required: true },

}); 


const Claim = mongoose.model( "Claim",claimSchema);  


module.exports = Claim;