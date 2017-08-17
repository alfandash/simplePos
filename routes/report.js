var express = require('express');
var router = express.Router();

const db = require('../models');
const Chart = require('chart.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('adapos', 'alfandash', 'alfandiki91', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});


router.get('/',(req,res)=>{
  res.render(`report`,{
      dates:[],
      totals:[]
    })
})


router.post('/',(req,res)=>{
  var date1 = `${req.body.year_1[0]}-${req.body.month_1[0]}-${req.body.day_1[0]}`
  var date2 = `${req.body.year_1[1]}-${req.body.month_1[1]}-${req.body.day_1[1]}`
  console.log(date1);
  console.log(date2);

  sequelize.query(`SELECT CAST("Transactions"."createdAt" AS DATE), SUM("Transactions".total) as "total" FROM public."Transactions" WHERE "Transactions"."createdAt" BETWEEN '${date1}' AND '${date2}' GROUP BY CAST("Transactions"."createdAt" AS DATE);`)
  .then((row)=>{
    var date = []
    var total = []
    var num = 0
    row[0].forEach((x)=>{
      console.log(x.createdAt);
      date.push(x.createdAt.toString())
      total.push(x.total)
      num++
      if(row[0].length === num){
        console.log(date);
        console.log(total);
        res.render('report',{
          dates:date,
          totals:total
        })
      }
    })
  })

})


router.get('/detail',(req,res)=> {
  db.Transaction.findById(req.query.id)
  .then((rowTransaction)=>{
    rowTransaction.getItems()
    .then((rowsItem)=>{
      //res.send(row)
      res.render('report',{
        transaction:rowTransaction,
        items: rowsItem,
        error:req.query.error,
        success:req.query.success})
    })
  })
  .catch((err)=>{
    res.redirect('/history?error='+err)
  })
})


module.exports = router;
