var express = require('express');
var router = express.Router();

const db = require('../models');
var twilio = require('twilio');


router.get('/',(req,res)=>{
  db.Transaction.findAll({
    order: [
      ['createdAt','ASC']
    ]
  })
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
        id:req.query.id,
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

router.post('/detail',(req,res)=>{
  db.Transaction.findById(req.query.id)
  .then((rowTransaction)=>{
    var templateSms = [];
    templateSms.push(`No transaksi: ${rowTransaction.noTransaction}`);
    templateSms.push(`Total belanja: ${rowTransaction.total}`)
    templateSms = templateSms.join("\r\n");

    //Sms reciept service
    var accountSid = 'ACd322782433cc2d4e94aaee68028f4de5'; // Your Account SID from www.twilio.com/console
    var authToken = '129f6e0a57751655093a2f5ab071b5b3';   // Your Auth Token from www.twilio.com/console
    var twilio = require('twilio');
    var client = new twilio(accountSid, authToken);
    client.messages.create({
        body: templateSms,
        to: `+${req.body.phone_number}`,  // Text this number
        from: '+12564459789' // From a valid Twilio number
    })
    .then((message) =>{
      res.redirect(`/history/detail?id=${req.query.id}&success=Informasi transaksi berhasil dikirim`)
    });
  })
  .catch((err)=>{
    res.redirect('/history/detail?id=${req.query.id}&error='+err)
  })



})


module.exports = router;
