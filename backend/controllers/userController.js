import User from '../models/User.js'

//create new User
export const createUser = async (req,res)=>{
    const newUser = new User(req.body)

    try{
        const savedUser = await newUser.save()
        res.status(200).json({success:true,message:"Successfully created",data:savedUser})
    } catch(err){
        res.status(500).json({success:false,message:"Failed to create. Try again"})
    }
}

export const updateUser = async(req,res) =>{
    const id  = req.params.id
    try{
        const updateUser = await User.findByIdAndUpdate(id, {$set: req.body}, {new:true})
        res.status(200).json({success:true,message:"Successfully updated",data:updateUser})
    }catch(err){
        res.status(500).json({success:false,message:"Failed to update. Try again"})
    }
}


export const deleteUser = async(req,res) =>{
    const id  = req.params.id
    try{
        await user.findByIdAndDelete(id)
        res.status(200).json({success:true,message:"Successfully deleted "})
    }catch(err){
        res.status(500).json({success:false,message:"Failed to delete. Try again"})
    }
}

//get single
export const getUser = async(req,res) =>{
    const id  = req.params.id
    try{
        const user = await User.findById(id)
        
        res.status(200).json({success:true,message:"Successful search",data:user})
    }catch(err){
        res.status(404).json({success:false,message:"not found"})
        
    }
}

//find all

export const findAllUser = async(req,res) =>{
// for pagination

    try{

        const users = await User.find({})
        res.status(200).json({success:true, message:"succesful search",data:users})

    }catch(err){
        res.status(404).json({success:false,message:"not found"})
    }
}


//get User by search

export const getUserBySearch = async(req, res)=>{

    const city = new RegExp(req.query.city, 'i')
    const distance = parseInt(req.query.distance)
    const maxGroupSize = parseInt(req.query.maxGroupSize)
    console.log(`city: ${city}  distance: ${distance}, maxGroupSize: ${maxGroupSize}`)

    try{
        const users = await User.find({city, distance:{ $gte: distance }, maxGroupSize: { $gte:maxGroupSize}})
        res.status(200).json({success:true, message:"succesful search", count: users.length,data:sers})

    }catch(err){
        res.status(404).json({success:false,message:"not found"})
    }
}

// get featured User




export const getUserCount = async(req, res)=>{


    try {
        const UserCount = await User.estimatedDocumentCount()
        res.status(200).json({succes:true, data:UserCount })
    } catch (error) {
        res.status(500).json({succes: false, message: 'Failed to fetch'})
    }
}


