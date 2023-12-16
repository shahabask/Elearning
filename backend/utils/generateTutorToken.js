import Jwt from "jsonwebtoken";

const generateTutorToken =(res,tutorId)=>{
 const token =Jwt.sign({tutorId},1234,{expiresIn:'30d'})

//  res.cookie('tutorJwt',token,{
//     httpOnly:true,
//     secure:process.env.NODE_ENV!=='development',
//     sameSite:'strict',
//     maxAge: 30*24*60*60*1000
//  })
 return token
}

export default generateTutorToken