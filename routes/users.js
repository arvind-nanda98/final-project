const router = require('express').Router();
const User = require('../models/User');
const {check, validationResult} = require('express-validator');





//get route for messages
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


//get route for messages using author name
router.route('/:author').get((req, res) => {
  User.find({
  author: req.params.author
})
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});


//post route for messages
router.route('/add',
[
    check('username','please enter a name!').trim().escape().not().isEmpty().isLength({min:3}),
    check('author', 'Must be unique').trim().escape().not().isEmpty().withMessage('Please enter a unique name'),
    check('dob', 'Choose your date of birth'),
  ],
).post(
 [
    check('username','please enter a name!').trim().escape().not().isEmpty().isLength({min:3}),
    check('author', 'Must be unique').trim().escape().not().isEmpty().withMessage('Please enter a unique name'),
    check('dob', 'Choose your date of birth'),
  ],
  
  
  (req, res) => {
    //error display
    const valError= validationResult(req);
    if(!valError.isEmpty()) {
    res.json({success: false});
    return false;
    }
    
    else{
  const username = req.body.username;     
  const  author= req.body.author;
  const  dob= req.body.dob;
  const  messages= req.body.messages;
  
  const newUser = new User({
    username,
    author,
    dob,
    messages
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
    }
});










module.exports=router;