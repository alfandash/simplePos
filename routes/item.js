var express = require('express');
var router = express.Router();

const db = require('../models');

router.get('/', function(req, res) {
  db.Item.findAll({
      order: [
        ['name', 'ASC']
      ]
    })
  .then((rows)=>{
    res.render('item',{items:rows,
      error:req.query.error,
      success:req.query.success})
  })
  .catch((err)=>{
    res.send(err)
  })
});

router.get('/add', function(req, res) {
  res.render('item-add',{error:req.query.error,
  success:req.query.success})
});

router.post(`/add`,function(req,res){
  var add={
    name: `${req.body.name}`,
    stock: `${req.body.stock}`,
    price: `${req.body.price}`,
    keterangan: `${req.body.keterangan}`
  }
  db.Item.create(add)
  .then(()=>{
    res.redirect(`/item?success=Barang sudah di daftarkan`)
  })
  .catch((err)=>{
    res.redirect(`/item/add?error=`+err.errors[0].message)
  })
})

router.get(`/delete`,function(req,res){
  var destroy = {
    where:{
      id:req.query.id
    }
  }
  db.Item.destroy(destroy)
  .then(()=>{
    res.redirect(`/item?success=Berhasil di delete`)
  })
  .catch((err)=>{
    res.redirect(`/item?error=`+err)
  })
})

router.get(`/edit`,function(req,res){
  db.Item.findById(req.query.id)
  .then((row)=>{
    res.render('item-edit',{item:row,
      error:req.query.error,
      success:req.query.success})
  })
  .catch((err)=>{
      res.redirect(`/item/edit?id=${req.query.id}&error=`+err.errors[0].message)
  })
})

router.post(`/edit`,function(req,res){
  var update={
    name: `${req.body.name}`,
    stock: `${req.body.stock}`,
    price: `${req.body.price}`,
    keterangan: `${req.body.keterangan}`
  }
  db.Item.update(update,{
    where: {
      id: req.query.id
    }
  })
  .then(()=>{
    res.redirect(`/item?success=Barang berhasil diupdate`)
  })
  .catch((err)=>{
  res.redirect(`/item/edit?id=${req.query.id}&error=`+err.errors[0].message)
  })
  //res.send(add)
})

module.exports = router;
