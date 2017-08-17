generateTransactionNumber = function() {
  let transNumber = Date.parse(new Date()) /1000
  //let random = Math.floor(Math.random() * 999) + 1
  return transNumber;
}

module.exports = generateTransactionNumber
