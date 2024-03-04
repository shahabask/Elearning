
import { Link,useNavigate } from 'react-router-dom';
import './UserLogin.css';
import { useState ,useEffect} from 'react';
import { useDispatch,useSelector} from 'react-redux';
import { toast } from 'react-toastify';
import { setCredentials } from '../../../slices/userSlice/authSlice';
import { useSignUpMutation } from '../../../slices/userSlice/userApiSlices'; 
import { motion } from "framer-motion";

function Signup() {

  const [firstName,setFirstName]=useState('')
  const [secondName,setSecondName]=useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword,setConfirmPassword]=useState('')
  const [formErrors,setFormErrors]=useState({})
//  const [isSubmit,setIsSubmit]=useState(false)

 const [signUp]=useSignUpMutation()

  const navigate = useNavigate();
  const dispatch = useDispatch();

 const {userInfo}=useSelector((state)=>state.auth)

useEffect(() => {
 
  if(userInfo){
    navigate('/')
  }
},[navigate, userInfo])


  // useEffect(()=>{
  //   if(Object.keys(formErrors).length==0&&isSubmit){
  //       console.log()
  //   }
  // },[formErrors])
  const submitHandler = async (e) => {
    e.preventDefault();
     setFormErrors(validate(firstName,secondName,email,password,confirmPassword))
      

       
       
       try{
        const localFormErrors = validate(firstName, secondName, email, password, confirmPassword);
        if(Object.keys(localFormErrors).length === 0) {

             const res= await signUp({firstName,secondName,email,password}).unwrap()
            //  const res=await axios.post('https://www.skillsync.website/api/register',{firstName,secondName,email,password})
             console.log(res,'res')
             dispatch(setCredentials({...res.data}))
             navigate('/')
             toast.success('successfully registered')
        }
            
    }catch(err){
      
     toast.error(err?.data)
    }
 
  
  };

  const validate=(firstName,secondName,email,password,confirmPassword)=>{

    const errors={}
    const passwordRegex= /^(?=.*[A-Za-z])(?=.*\d)(?!\s).{6,}$/;
    const regex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

       if(!firstName){
        errors.firstName='firstName is required'
       }else if(firstName.length<3){
        errors.firstName='firstName must be more than 2 characters'
       }
       if(!secondName){
        errors.secondName='secondName is required'
       }else if(secondName.length<3){
        errors.secondName='secondName must be more than 2 characters'
       }
      if(!email)  {
       errors.email='Email is required'
      }else if(!regex.test(email)){
        errors.email='This is an invalid email'
      }
      if(!password){
        errors.password='Password is required'
      }else if(!passwordRegex.test(password)){
       errors.password='Please create an strong password'
      }
      if(!confirmPassword){
        errors.confirmPassword='please confirm the password'
      }else if(confirmPassword!=password){
        errors.confirmPassword='Entered password is not matching'
      }
      return errors
  }

  return (
    <>
      <div className="signup template d-flex justify-content-center align-items-center vh-100 text-violet-800" 
      style={{
       
        backgroundImage: 'url("/images/login2.jpg")', 
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat',  
      }}  >
      <div className="p-5 rounded w-28 md:w-45 sm:w-90 border shadow-lg bg-white">
    <form onSubmit={submitHandler}>
      <motion.h3 initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2}} className="text-center font-bold text-3xl mb-2">Sign Up</motion.h3>
      <div className="mb-3">
        <input type="text" value={firstName} placeholder="Enter first name" onChange={(e) => setFirstName(e.target.value)} className="form-control" />
        <p style={{ color: 'red' }}>{formErrors.firstName}</p>
      </div>
      <div className="mb-3">
        <input type="text" value={secondName} placeholder="Enter second name" onChange={(e) => setSecondName(e.target.value)} className="form-control" />
        <p style={{ color: 'red' }}>{formErrors.secondName}</p>
      </div>
      <div className="mb-3">
        <input type="email" value={email} placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} className="form-control" />
        <p style={{ color: 'red' }}>{formErrors.email}</p>
      </div>
      <div className="mb-3">
        <input type="password" value={password} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} className="form-control" />
        <p style={{ color: 'red' }}>{formErrors.password}</p>
      </div>
      <div className="mb-3">
        <input type="password" value={confirmPassword} placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" />
        <p style={{ color: 'red' }}>{formErrors.confirmPassword}</p>
      </div>

      <div className="d-grid mt-2">
        <button className="btn mb-3 font-semibold text-violet-100 bg-violet-900 hover:bg-violet-800" >Sign Up</button>
      </div>
      <p className="text-center mt-2 text-sm">
        <Link to="/login" style={{ textDecoration: 'none' }}>Sign In</Link>
      </p>
    </form>
  </div>
</div>


    </>
  )
}

export default Signup