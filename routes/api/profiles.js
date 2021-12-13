const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profiles')
const User = require('../../models/User')
const Post = require('../../models/Post')

const { check, validationResult } = require('express-validator/check');
//const { request } = require('express');
const config = require('config');
const request = require('request');

// @route GET api/profiles/me
// @desc get current user profile
// @access provate
router.get('/me', auth,
    async (req, res) => {
        try {
            const profile = await Profile.findOne({ user: req.user.id }).populate(
                'user',
                ['name', 'avatar']);
            if (!profile) {
                return res.status(400).json({ msg: "There is no profile for this user" });
            }

        }
        catch (err) {
            console.log(err.message);
            res.status(500).send('Server error');
        }

    });

//@route POST api/profiles
//@desc create update current user profile
//@access provate
router.post('/',
    [auth,
        [
            check('status', 'Status is required').not().isEmpty(),
            check('skills', 'Skills is required').not().isEmpty()
        ]]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;


        //Build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }

        //build social obj
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (facebook) profileFields.social.facebook = facebook;
        if (twitter) profileFields.social.twitter = twitter;
        if (instagram) profileFields.social.instagram = instagram;
        if (linkedin) profileFields.social.linkedin = linkedin;


        try {
            let profile = await Profile.findOne({ user: req.user.id });
            if (profile) {
                //update
                profile = await Profile.findOneAndUpdate({ user: req.user.id },
                    { $set: profileFields }, //whats this ?
                    { new: true });
                return res.json(profile);
            }

            // create
            profile = new Profile(profileFields);
            await profile.save();
            return res.json(profile);
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }

    });
//@route GET api/profiles
//@desc get all profile
//@access provate
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});


//@route GET api/profiles/user/:user_id
//@desc get  profile by user id
//@access provate
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({user : req.params.user_id}).populate('user', ['name', 'avatar']);

        if(!profile){
            res.status(400).json({msg:"Profile not found"});
        }
        res.json(profile);
    } catch (err) {
        console.log(err.message);
        if(err.kind == "ObjectId"){
            res.status(400).json({msg:"Profile not found"}); 
        }
        res.status(500).send('Server Error');
    }
});



//@route DELETE api/profile
//@desc Delete  profile ,user posts
//@access provate
router.delete('/', auth,async (req, res) => {
    try {
        //remove post
        await Post.deleteMany({ user : req.user.id});
        //Remove profile
        await Profile.findOneAndRemove({user : req.user.id});
        //Remove user
        await User.findOneAndRemove({_id : req.user.id});

        res.json({msg : "User deleted"});
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
//@route PUT api/profile/experience
//@desc Add profile experirnce
//@access provate
router.put('/experience' , [auth,
    check('title' , 'Titile is required').not().isEmpty(),
    check('company' , 'Company is required').not().isEmpty(),
    check('from' , 'From date is required').not().isEmpty()
] ,
async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    };

    try{
        const profile  = await Profile.findOne({user : req.user.id});

        profile.experience.unshift(newExp);

        await profile.save();

        res.json(profile);

    }catch(err){
        console.log(err.message);
        res.status(500).send("server error");

    }

});

//@route DELETE api/profile/experience/:exp_id
//@desc Delete experirnce
//@access provate
router.delete('/experience/:exp_id', auth , async(req,res)=>{
    try{
        const profile = await Profile.findOne({user: req.user.id});

        //get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex , 1);

        await profile.save();


        res.json({msg:"Deleted"});
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("server error");

    }

});



//@route PUT api/profile/experience
//@desc Add profile experirnce
//@access provate
router.put('/education' , [auth,
    check('school' , 'school is required').not().isEmpty(),
    check('degree' , 'degree is required').not().isEmpty(),
    check('fieldofstudy' , 'fieldofstudy is required').not().isEmpty(),
    check('from' , 'From date is required').not().isEmpty()
] ,
async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    };

    try{
        const profile  = await Profile.findOne({user : req.user.id});

        profile.education.unshift(newEdu);

        await profile.save();

        res.json(profile);

    }catch(err){
        console.log(err.message);
        res.status(500).send("server error");

    }

});


//@route DELETE api/profile/education/:edu_id
//@desc Delete education
//@access provate
router.delete('/education/:edu_id', auth , async(req,res)=>{
    try{
        const profile = await Profile.findOne({user: req.user.id});

        //get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.edu_id);

        profile.experience.splice(removeIndex , 1);

        await profile.save();


        res.json({msg:"Deleted"});
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("server error");

    }

});

//@route GET api/profile/github/:githubusername
//@desc Get userr repos from githib
//@access public
router.get('/github/:username' , (req,res)=>{
    try{
        const options = {
            uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githibclientid')}&client_secret=${config.get('githubsecret')}`,
            method:'GET',
            headers:{'user-agent':'node.js'}
        };
        request(options,(error,response,body) =>{
            if(error){
            console.error(error);
            }
            
            if(response.statusCode != 200){
                return res.status(404).json({msg:"No Github profile found"});
            }

            res.json(JSON.parse(body));

        });


    }catch(err){
        console.log(err.message);
        res.status(500).send('Server error');
    }
})

module.exports = router;

