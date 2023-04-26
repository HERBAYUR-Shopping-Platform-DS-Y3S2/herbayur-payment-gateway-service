const express = require('express');
const router = express.Router();
const braintree = require('braintree');
var cors = require('cors');

router.post('/',cors(), (req, res, next) => {
  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: 'dtf5v9sfp3p2jpwy',
    publicKey: '4xkhtb272vp7wfh9',
    privateKey: '5aa05a60db21cb4b7f48a223c0f4daa5'
  });

  // Use the payment method nonce here
  const nonceFromTheClient = req.body.paymentMethodNonce;
  console.log("request", req.body);
  // console.log("response", res);

  const newTransaction = gateway.transaction.sale({
    // amount: '10.00',
    paymentMethodNonce: nonceFromTheClient,
    options: {
      // This option requests the funds from the transaction
      // once it has been authorized successfully
      submitForSettlement: true
    }
  }, (error, result) => {
      if (result) {
        res.send(result);
        console.log("result",result);
      } else {
        res.status(500).send(error);
        console.log("error", error);
      }
  });
});

module.exports = router;