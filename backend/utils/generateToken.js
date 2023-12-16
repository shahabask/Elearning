import Jwt from "jsonwebtoken";

const generateToken =(res,userId)=>{
 const token =Jwt.sign({userId:userId},'1234',{expiresIn:'30d'})

//  res.cookie('jwt',token,{
//     httpOnly:true,
//     secure:process.env.NODE_ENV!=='development',
//     sameSite:'strict',
//     maxAge: 30*24*60*60*1000
//  })
 return token;
}

export default generateToken