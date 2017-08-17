var express = require('express');
var router = express.Router();


router.use((req,res,next)=>{
  if(!req.session.id_items){
    req.session.id_items = [];
    req.session.total_items = [];
    next()
  } else {
    next()
  }
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',
  welcome: 'Selamat dataang di ADApos:SimpleVer',
  error: req.query.error});
});

module.exports = router;
