
import { Link,useNavigate  } from 'react-router-dom';
import '../../user/authentication/Signup.css';
import { useState ,useEffect} from 'react';
import { useDispatch,useSelector} from 'react-redux';
import { axiosInstance as tutorAxiosInstance } from '../../utils/tutorAxios';
import { toast } from 'react-toastify';
import { setTutorCredentials } from '../../../slices/tutorSlice/tutorAuthSlice';
import { useTutorRegisterMutation } from '../../../slices/tutorSlice/tutorApiSlice';
import axios from 'axios';

function TutorSignup() {

  const [userName,setUserName]=useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword,setConfirmPassword]=useState('')
  const [formErrors,setFormErrors]=useState({})
 const [isSubmit,setIsSubmit]=useState(false)

  const navigate = useNavigate();
  const dispatch = useDispatch();

const [tutorRegister]=useTutorRegisterMutation()
const {tutorInfo}=useSelector((state)=>state.tutorAuth)
  useEffect(() => {
    if (tutorInfo){
      navigate("/tutor/dashboard")
    }
  }, [navigate, tutorInfo]);

  useEffect(()=>{
    if(Object.keys(formErrors).length==0&&isSubmit){
        console.log()
    }
  },[formErrors])
  const submitHandler = async (e) => {
    e.preventDefault();
        setFormErrors(validate(userName,email,password,confirmPassword))
       setIsSubmit(true)
       
         if (Object.keys(formErrors).length === 0){
       try {
        const res=await axios.post(`http://localhost:5000/api/tutor/register`,{userName,email,password}) 
                dispatch(setTutorCredentials({...res.data}))
                navigate('/tutor/dashboard')
       } catch (error) {
        console.log(error?.data)
        console.log('error',error)
        toast.error(error?.data || error.error)
       }
       
      }
  };

  const validate=(userName,email,password,confirmPassword)=>{

    const errors={}
    const passwordRegex=/^(?=.*[A-Za-z])(?=.*\d)(?!\s).{6,}$/;
    const regex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
       if(!userName){
        errors.userName='Username is required'
       }else if(userName.length<3){
        errors.userName='Username must be more than 2 characters'
       }
      if(!email)  {
       errors.email='Email is required'
      }else if(!regex.test(email)){
        errors.email='This is an invalid email'
      }
      if(!password){
        errors.password='Password is required'
      }else if(!passwordRegex.test(password)){
        errors.password='Create a strong password'
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
   <div className='signup template d-flex justify-content-center align-items-center vh-100 ' style={{backgroundColor:'#33363d'}}>
   <div className='form_container p-5 rounded' style={{backgroundColor:'#ffc0cb'}}>
     <form onSubmit={submitHandler}>
       <h3 className='text-center'>Tutor SignUp</h3>
       <div className='mb-3'>
         <input type="text" value={userName} placeholder='Enter username' onChange={(e)=>{
              setUserName(e.target.value)
            }} className='form-control' />
            <p style={{color:'red'}}>{formErrors.userName}</p>
       </div>
       <div className='mb-3'>
         <input type="email" value={email} placeholder='Enter Email' onChange={(e)=>{
              setEmail(e.target.value)
            }} className='form-control' />
            <p style={{color:'red'}}>{formErrors.email}</p>
       </div>
       <div className='mb-3'>
         <input type="password" value={password} placeholder='Enter password' onChange={(e)=>{
              setPassword(e.target.value)
            }} className='form-control' />
            <p style={{color:'red'}}>{formErrors.password}</p>
       </div>
       <div className='mb-3'>
         <input type="password" value={confirmPassword} placeholder='Confirm Password' onChange={(e)=>{
              setConfirmPassword(e.target.value)
            }} className='form-control' />
            <p style={{color:'red'}}>{formErrors.confirmPassword}</p>
       </div>
       <div className='d-grid mt-2'>
         <button className='btn mb-3' style={{backgroundColor: 'grey', color: 'white'}}>Sign Up</button>
       </div>
       <p className='text-end mt-2'>
          <Link style={{ color: 'black',textDecoration:'none'}} to='/tutor/login' className='ms-2'>Sign In</Link>
       </p>
     </form>
   </div>
 </div>
   </>
  )
}

export default TutorSignup