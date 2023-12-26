const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User=require('../models/User');
const {secret} = require('../config/authConfig');

exports.register=async(req,res)=>{
    try{
        const {name,email,password,phone_number,department} = req.body;

        let user= await User.findOne({email});

        if(user){
            return res.status(400).json({message:'Useralready existe'});
        }

        const newUser = new User({
            name,
            email,
            password,
            phone_number,
            department,
        });

        const salt = bcrypt.genSalt(10); 
        newUser.password = await bcrypt.hash(password,salt);

        await newUser.save();

        res.status(201).json({message:'User registered successfully'});

    } catch(err){
        res.status(500).json({message:'Server Error'});
    }
}

exports.login= async(req,res)=>{
    try{
        const {email,password}=req.body;

        const user=await User.findOne({email});

        if(!user){
           return  res.status(400).json({message:'Invalid credentials'});
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({message:'Invalid credentials'});
        }

        const payload={
            user:{
                id:user.id,
            },

        }

        jwt.sign(payload,secret,{expireIn:'2h'},(err,token)=>{
            if(err)throw err;
            res.status(200).json({token});
        })

    }
    catch(err){
        res.status(500).json({message:'Server Error'});
    }
};