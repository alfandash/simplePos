var express = require('express');
var router = express.Router();

const db = require('../models');


router.get('/',(req,res)=>{
  db.Transaction.findAll()
  .then((rows)=>{
    res.render('history',{transactions:rows,
      error:req.query.error,
      success:req.query.success})
  })
  .catch((err)=>{
    res.render('history',{items:rows,
      error:req.query.error,
      success:req.query.success})
  })
})

router.get('/detail',(req,res)=> {
  db.Transaction.findById(req.query.id)
  .then((rowTransaction)=>{
    rowTransaction.getItems()
    .then((rowsItem)=>{
      //res.send(row)
      res.render('history-detail',{
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
