const Notice=require('../models/Notice');
const User=require('../models/User');

exports.createNotice = async (req,res)=>{
    try{
        const{title,body,category,date}=req.body;

        const userId = req.user.id;

        const newNotice=new Notice({
            title,
            body,
            category,
            date,
            user:userId,
        })

        await newNotice.save();

        res.status(201).json({message:'Notice created successfully'});

    }catch(err){
        res.status(500).json({message:'Server Error'});
    }
}

exports.getAllNotices=async(req,res)=>{
    try{
        const{category}=req.query;

        let notices;
        if(category){
            notices=await Notice.find({category}).populate('user','name email');
        }
        else{
            notices=await Notice.find().populate('user','name email');
        }
        res.status(200).json(notices);
    }catch(err){
        res.status(500).json({message:'Server Error'});
    }
}