import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
    buyerId:{type:String},
    product:{type:Object},
    shipped:{type:Boolean},
}) 

export default mongoose.model.Orders || mongoose.model("Order",orderSchema);