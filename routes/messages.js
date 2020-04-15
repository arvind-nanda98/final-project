const router = require('express').Router();
const Message = require('../models/Message');
const {check, validationResult} = require('express-validator');



//get route for messages using author name
router.route('/:author').get((req, res) => {
  Message.find({
  author: req.params.author
})
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});



//post route for messages
router.route('/add').post(
  [
    check('message','please enter a message!').trim().escape().not().isEmpty().isLength({min:3}),
    check('title','please enter a Title!').trim().escape().not().isEmpty().isLength({min:3}),
  ],
  
  (req, res) => {
    const valError= validationResult(req);
    if(!valError.isEmpty()) {
    res.json({success: false});
    return false;
    }
    
    
  const message = req.body.message;
  const author = req.body.author;
  const title = req.body.title;
  const date = req.body.date;

  const messageBody = new Message({
    message,
    author,
    title,
    date
  });
         


  messageBody.save()
    .then(results=>{
        res.send(results);
    })
    .catch(error=>res.send(error));
});




//get route for messages
router.route('/').get((req, res) => {
  Message.find()
    .then(results=>{
        res.send(results);
    })
    .catch(error=>res.send(error));
});



// //get route for messages using author name
// router.route('/:id').get((req, res) => {
//   Message.findById(req.params.id)
//     .then(user => res.json(user))
//     .catch(err => res.status(400).json('Error: ' + err));
// });





module.exports=router;
    
    
    
    
    
    
    
    
 