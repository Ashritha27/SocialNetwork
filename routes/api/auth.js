const express = require('express');
const router =express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const {check ,validationResult} = require('express-validator/check');

const gravatar = require('gravatar');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route GET api/auth
//@desc Test route
//@access Public
//add auth will authorize apis
router.get('/',auth, async(req,res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);

    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');


    }
}

);




//@route  POST api/auth
// @desc  authenticate user & get token
//@access Public

router.post('/' 
,[
    check('email','Please inclucde valid email').isEmail(),
    check('password','Password is required').exists()
]
,async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()});
    }
    
    const {email,password} =req.body;
    
    try{
        let user = await User.findOne({email});
        
    //See if user exists
    if(!user){
        return res.status(400).json({errors :[{ msg : "Invalid credentials"}]});
    }
    
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({errors :[{ msg : "Invalid credentials"}]});
    }
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

