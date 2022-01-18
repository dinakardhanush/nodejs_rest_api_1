const express = require('express');
const req = require('express/lib/request');
const router = express.Router();

const { body, validationResult } = require('express-validator');

const {User} = require('../models/user');



router.post('/postall',
body('name').isString().isLength({min:2,max:50}),
body('age').isInt().isLength({min:1,max:50}),
body('phone').isMobilePhone().isLength({min:10,max:10}),
body('email').isEmail(),
async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userConst = User({
        name:req.body.name,
        age:req.body.age,
        phone:req.body.phone,
        email:req.body.email
    })

    userConst.save().then(user=>{
        res.send(user);
    }).catch((err)=>{
        res.status(500).send("some invalid data");
    });
    
});

router.get('/getall',async(req,res)=>{
    User.find().then(user=>{
        res.send(user);
    }).catch((err)=>{
        res.status(500).send(err);
    });
    
});

router.get('/get/:id',async(req,res)=>{
    User.findById(req.params.id).then(user=>{
        if(user){
            res.send(user);
        }else{
            res.status(404).send("user not found 2");
        }
    }).catch((err)=>{
        res.status(500).send("something went wrong")
    });
});

router.put('/put/:id',async(req,res)=>{
    const updateuser = await User.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        age:req.body.age,
        phone:req.body.phone,
        email:req.body.email
    },
    {new:true});

    if(!updateuser) res.status(400).send('cannot update user');
    res.send(updateuser)
})


router.delete('/delete/:id',async(req,res)=>{
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if(!deleteUser)res.status(400).send("delete user error");
    res.send(deleteUser);

    console.log(User.find())
        
    
})

module.exports = router;