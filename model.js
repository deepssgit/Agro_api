const mongoose=require("mongoose")

const reportShema = new mongoose.Schema({
    userID:String,
    marketID:String,
    marketName:String,
    cmdtyID:String,
    Market_type:String,
    cmdtyName:String,
    priceUnit:Number,
    Price:Number,
    UnitPrice:Number
   
})

module.exports = mongoose.model("Reportdetail",reportShema)