import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//user registration
export const register = async(req,res)=>{

  
    try {
        // hasing password

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            username: req.body.username, 
            email:req.body.email,
            password:hash,
            photo: req.body.photo})

        await newUser.save()
        res.status(200).json({succes:true, message:'Succesfully created'})
        
    } catch (error) {
        res.status(500).json({succes:false, message:'failed to created try again'})
    }
}

//user login 
// export const login = async(req,res)=>{

//     const email = req.body.email
//     try {

//         const user = await User.findOne({email})

//         if(!user){
//             return res.status(404).json({success:false, message:"user not found"})
//         }            
        
//         const checkCorrectPassword = bcrypt.compare(req.body.password, user.password)

//         if(!checkCorrectPassword){
//             return res.status(401).json({success:false, message: 'incorrect email or password'})
//         }

//         const {password, role, ...rest} = user._doc
//         //create jwt token
//         const token = jwt.sign({id:user._id,role:user.role}, process.env.JWT_SECRET_KEY, { expiresIn:"15d"})
//         res.cookie('accessToken',token,{
//             httpOnly:true,
//             expires:token.expiresIn
//         }).status(200).json({success:true, message:'succesfully login', data:{...rest}})
        
//     } catch (error) {
        
//         return res.status('500').json({success:false,message: 'Failed to login'})
//     }
// }

export const login = async (req, res) => {


    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      console.log(user)
  
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: { message: 'User not found' } });
      }
  
      const isCorrectPassword = await bcrypt.compare(password, user.password);
      console.log(`contrasena es: ${isCorrectPassword}`)
      if(isCorrectPassword){
        const {password, role, ...rest} = user._doc

        //create token jwt
        const token = jwt.sign({is: user._id, role: user.role}, process.env.JWT_SECRET_KEY, {expiresIn: '15d'})

        //set token in the browser cookies and send the response to the client
        res.cookie('accesToken', token, {httpOnly:true,expires:token.expiresIn}).status(200).json({ token, success: true, succes: { message: 'succesfully login' }, data:{...rest} });
      }else{
        return res.status(500).json({ success: false, error: { message: 'usuario o contraseña incorrecto' } });
      }
  
    //   await res.status(200).json({ success: true, data: rest });
    } catch (error) {
      return res.status(500).json({ success: false, error: { message: 'Failed to login' } });
    }
  };