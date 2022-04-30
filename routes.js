const express = require("express")

const router = express.Router()

const Model = require("../models/model")


router.get("/",function(req,res){
    res.render("home")
})

router.get("/addreport",function(req,res){
    res.render("addreport")
})
router.get("/findreport",function(req,res){
    res.render("findreport")
})

router.post("/addreport",function(req,res){

    
        if(req.body.P_unit==="Kg"){
            units=1
        }
        if(req.body.P_unit==="Quintal"){
            units=100
        }
        if(req.body.P_unit==="Bag"){
            units=50
        }
    wholesome=req.body.Price

    price_kg = wholesome/units
    


    const reportdetail = new Model({
        userID:req.body.userid,
    marketID:req.body.m_id,
    marketName:req.body.m_name,
    cmdtyID:req.body.c_id,
    Market_type:req.body.m_type,
    cmdtyName:req.body.c_name,
    priceUnit:units,
    Price:req.body.Price,
    UnitPrice:price_kg
    })

    console.log(reportdetail);
    reportdetail.save()
    res.send("<h1>Report successfully Submitted</h1>")

})

var MongoClient = require('mongodb').MongoClient;

router.post("/findreport",function(req,res){
    const commodity = req.body.input_com_name

    const market_Name= req.body.Market_Name

    MongoClient.connect('mongodb://localhost:27017', function(err, client) {
       if(err) throw err;
       var db =client.db("agriDB")
       var collection = db.collection('reportdetails');

    collection.findOne({cmdtyName:commodity,marketName:market_Name}, function(err,doc){
      if(doc){
           unitAraay=[]
           unitAraay.push(doc.UnitPrice)
           agg_sum=0
           for(let i=0;i<unitAraay.length;i++){
                agg_sum=agg_sum+unitAraay[i]
           }

       
        agg_price=agg_sum/(unitAraay.length)

        console.log(agg_price)
        // const responsedata={
    //         Commodity_Name:doc.cmdtyName,
    //         PerKg:agg_sum
    //     }
    //    const jsoncontent=JSON.stringify(responsedata)
    //     res.sendStatus(jsoncontent)
    };
      client.close();
      if(err){
       res.send("<h1>Data Doesn't exist</h1>")
      }
  });

})

})


module.exports = router 