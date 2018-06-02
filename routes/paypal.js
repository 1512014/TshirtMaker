var express = require('express');
var router = express.Router();
var paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AYRuFMC6voxDzrtXDk5BO5LjMsRgihIDHvRBQXwVx8JWtyNF4ums5y9CLn_68ArLcTLI5sDriR9uFQ4u',
    'client_secret': 'ENIhZGkKaghcEVKtAIKxkG5j9JKZjlmu47UvFse4xRz6n5LhaOHZkktGsgzObMUmUiZi_sK8K1GvYS49'
  });
router.get('/',function(req,res){
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/paypal/success",
            "cancel_url": "http://localhost:3000/paypal/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Red Jeans",
                    "sku": "001",
                    "price": "10.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "10.00"
            },
            "description": "This is the payment description."
        }]
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for( let i=0;i<payment.links.length;i++){
                if(payment.links[i].rel==='approval_url'){
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });
});

router.get('/success',function(req,res){
    const payerId=req.query.PayerID;
    const paymentId=req.query.paymentId;
    const execute_payment_json={
        "payer_id":payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "10.00"
            }
        }]
    }
    paypal.payment.execute(paymentId,execute_payment_json,function(error,payment){
        if(error){
            console.log(error.response);
            throw error;
        }else{
            console.log(JSON.stringify(payment));
            res.send('success');
        }
    });
});

router.get('/cancel',function(req,res){
    res.send("cancel");
});
module.exports = router;