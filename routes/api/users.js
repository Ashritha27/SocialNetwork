const express = require('express');
const router= express.Router();
const {check ,validationResult} = require('express-validator/check');
const User = require("../../models/User");
const gravatar = require('gravatar');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


//@route  POST api/users
// @desc  Register user
//@access Public

router.post('/' 
,[
    check('name' , 'Name is required').not().isEmpty(),
    check('email','Please inclucde valid email').isEmail(),
    check('password','Please enter password with 6 or more charaters').isLength({min:6})
]
,async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()});
    }
    const {name,email,password} =req.body;
    
    try{
        let user = await User.findOne({email});
        
    //See if user exists
    if(user){
        return res.status(400).json({errors :[{ msg : "User already exists"}]});
    }
    //get user gravatar
    const avatar = gravatar.url(email,{
        s:"200",
        r:'pg',
        d:"mm"
    });
    user =new User({
        name,
        email,
        avatar,
        password
    });
    //to encryt need salt
       //Encrypt paswword
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password,salt);
    //anything waits a promise add await
    //save user in db
    await user.save();
    //console.log(user);
    //Return JSONWEBtoken
    const payload ={
        user:{
            id:user.id    //id in mongo db
        }
    }

    jwt.sign(payload,config.get('jwtsecret'),
        {expiresIn : 36000},
        (err ,token)=>{
            if(err) throw err;
            res.json({token});
        }
    );
   }
catch(err){
    console.log(err.message);
}
    //res.send('user registered');

});

module.exports = router;