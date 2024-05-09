const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'clients', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    contract: { type: mongoose.Schema.Types.ObjectId, ref: 'Contract', required: true },

    vol: { type: Boolean, required: true },
    end_date: { type: String, required: true },
   
    
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;
