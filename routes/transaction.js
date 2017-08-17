var express = require('express');
var router = express.Router();


const db = require('../models');
var generateTransactionNumber = require('../helpers/generateTransactionNumber');

/* GET users listing. */
router.get('/', function(req, res) {
  if (req.session.id_items.length !== 0) {
    db.Item.findAll({
      where: {
        id: req.session.id_items
      }
    })
    .then((rows)=>{
      var num=0;
      rows.forEach((row)=>{
        row.total_items = req.session.total_items[num]
        row.subtotal = req.session.total_items[num] * row.price
        num++;
        if (req.session.total_items.length === num) {
          res.render('transaction',{items:rows,
            error:req.query.error,
            success:req.query.success})
        }
      });
    })
    .catch((err)=>{
      res.send(err)
    })
  } else {
    res.render('transaction',{items:[],
      error:req.query.error,
      success:req.query.success})
  }
});

router.get('/add', function(req, res) {
  db.Item.findAll()
  .then((rows)=>{
    res.render('transaction-add',{
      items:rows,
      error:req.query.error,
    success:req.query.success})
  })
});

router.post(`/add`,function(req,res){
  if (req.session.id_items.indexOf(req.body.idItems) === -1) {
    req.session.id_items.push(req.body.idItems);
    req.session.total_items.push(req.body.total);
    res.redirect('/transaction?success=Barang berhasil di tambahkan')
  } else {
    res.redirect('/transaction?error=barang sudah ada pada keranjang')
  }
})

router.get(`/emptyCart`,function(req,res){
  req.session.destroy()
  res.redirect('/transaction')
})

router.get(`/delete`,function(req,res){
  var index = req.session.id_items.indexOf(req.query.id)
  req.session.id_items.splice(index, 1);
  req.session.total_items.splice(index, 1);
  res.redirect('/transaction?success=Barang berhasil di hilangkan dari keranjang')
})

router.get(`/edit`,function(req,res){
  let index = req.session.id_items.indexOf(req.query.id)
  let totalItem = req.session.total_items[index]
  db.Item.findById(req.query.id)
  .then((row)=>{
    res.render('transaction-edit',{item:row,
      total: totalItem,
      error:req.query.error,
      success:req.query.success})
  })
  .catch(()=>{
      res.redirect(`/transaction/edit?error=`+err)
  })
})

router.post(`/edit`,function(req,res){
  var index = req.session.id_items.indexOf(req.query.id)
  req.session.total_items.splice(index, 1, req.body.total);
  res.redirect('/transaction?success=Barang berhasil di rubah')
})

router.get(`/checkout`,function(req,res){
  if (req.session.id_items.length !== 0) {
    db.Item.findAll({
      where: {
        id: req.session.id_items
      }
    })
    .then((rows)=>{
      var num=0;
      var totalTransaction = 0;
      //console.log(rows[0].dataValues.name);
      rows.forEach((row)=>{
        row.dataValues.total_items = req.session.total_items[num]
        row.dataValues.subtotal = req.session.total_items[num] * row.price
        row.dataValues.stock -= req.session.total_items[num]
        totalTransaction += row.dataValues.subtotal
        num++;
        if (req.session.total_items.length === num) {
          req.session.cart = rows
          req.session.total = totalTransaction
          res.render('checkout',{items:rows,
            total: totalTransaction,
            error:req.query.error,
            success:req.query.success})
        }
      });
    })
    .catch((err)=>{
      console.log(err);
      res.send(err)
    })
  } else {
    res.render('transaction',{items:[],
      error:req.query.error,
      success:req.query.success})
  }
})

router.post(`/checkout`,function(req,res){
  let transactionNum = generateTransactionNumber()
  let transaction = {
    noTransaction: transactionNum,
    total: req.session.total,
    moneyPay: req.body.moneyPay
  }
  db.Transaction.create(transaction)
  .then((row)=>{
    //console.log(berhasil);
    function bulkInsert(row,cart,cb){
      let num = 0
      cart.forEach((x)=>{
        db.ItemTransaction.create({
          noTransaction: row.noTransaction,
          idItems: x.id,
          idTransactions: row.id,
          total: x.total_items,
          price: x.price,
          subtotal: x.subtotal
        })
        .then(()=>{
          db.Item.update({stock:x.stock},{where: {id:x.id}})
          num++
          if (cart.length === num){
            return cb()
          }
        })
      })
    }

    bulkInsert(row,req.session.cart,()=>{
      req.session.destroy()
      res.redirect('/transaction?success=Transaksi berhasil')
    })
  })

})



module.exports = router;
