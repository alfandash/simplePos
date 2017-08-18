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

// const sequelize = new Sequelize('d9u55vvmeeshpg', 'ckacvotbttsvvz', '9a89f068d85151db69846e3780531bd05e4871a74350feb4ffd0006fc1e8f538', {
//   host: 'ec2-107-22-167-179.compute-1.amazonaws.com',
//   dialect: 'postgres',
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   },
// });


router.get('/',(req,res)=>{
  res.render(`report`,{
      dates:[],
      totals:[],
      error: req.query.error,
      typeChart:''
    })
})


router.post('/',(req,res)=>{
  var date1 = `${req.body.year_1[0]}-${req.body.month_1[0]}-${req.body.day_1[0]}`
  var date2 = `${req.body.year_1[1]}-${req.body.month_1[1]}-${Number(req.body.day_1[1])+1}`
  if (date2<date1) {
    res.redirect(`/report?error=Tanggal mula tidak boleh lebih kecil`)
  } else {
    sequelize.query(`SELECT CAST("Transactions"."createdAt" AS DATE), SUM("Transactions".total) as "total" FROM public."Transactions" WHERE "Transactions"."createdAt" BETWEEN '${date1}' AND '${date2}' GROUP BY CAST("Transactions"."createdAt" AS DATE);`)
    .then((row)=>{
      var date = []
      var total = []
      var num = 0
      row[0].forEach((x)=>{
        date.push(x.createdAt)
        total.push(x.total)
        num++
        if(row[0].length === num){
          res.render('report',{
            dates:date,
            totals:total,
            typeChart: req.body.chart,
            error:req.query.error,
          })
        }
      })
    })
  }
})


router.get('/detail',(req,res)=> {
  db.Transaction.findById(req.query.id)
  .then((rowTransaction)=>{
    rowTransaction.getItems()
    .then((rowsItem)=>{
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
