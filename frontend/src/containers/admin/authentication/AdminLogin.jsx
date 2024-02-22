
import '../../user/authentication/UserLogin.css';
import {Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios';
import { setAdminCredentials } from '../../../slices/adminSlice/adminAuthSlice';
import { toast } from 'react-toastify';
import {axiosInstance} from '../../utils/adminAxios';

function AdminLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors,setFormErrors]=useState({})
 const [isSubmit,setIsSubmit]=useState(false)

  const navigate = useNavigate();
  const dispatch = useDispatch();

 const {adminInfo}=useSelector((state)=>state.adminAuth)


  useEffect(() => {
    if (adminInfo) {
      navigate("/admin");
    }
  }, [navigate, adminInfo]);

  useEffect(()=>{
    if(Object.keys(formErrors).length==0&&isSubmit){
        console.log()
    }
  },[formErrors])
  const submitHandler = async (e) => {
    e.preventDefault();
        setFormErrors(validate(email,password))
       setIsSubmit(true)
       
       try {
         const res=await axios.post('https://www.skillsync.website/api/admin/login',{email,password})
         
           dispatch(setAdminCredentials({ ...res.data })) 
           navigate('/admin');
       } catch (error) {
    
              toast.error(error?.data|| error.error)
       }
  };

  const validate=(email,password)=>{

    const errors={}
    const regex= /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if(!email)  {
       errors.email='Email is required'
      }else if(!regex.test(email)){
        errors.email='This is an invalid email'
      }
      if(!password){
        errors.password='Password is required'
      }else if(password.length<3){
        errors.password='Password must be more than or equal to 3 characters'
      }else if(password.length>10){
        errors.password='Password must be less than or equal to 10 characters'
      }
      return errors
  }
  return (
    <div className='login template d-flex justify-content-center align-items-center vh-100 '>
    <div className='p-5 rounded w-30 md:w-45 sm:w-90 border shadow-lg'>
      <form onSubmit={submitHandler}>
        <h3 className='text-center'>Admin Login</h3>
        <div className='mb-3'>
          <input type="email" placeholder='Enter Email'  onChange={(e) => {
                setEmail(e.target.value);
              }} className='form-control' />
          <p style={{color:'red'}}>{formErrors.email}</p>
        </div>
        <div className='mb-3'>
          <input type="password" placeholder='Enter password'  onChange={(e) => {
                setPassword(e.target.value);
              }} className='form-control' />
          <p style={{color:'red'}}>{formErrors.password}</p>
        </div>
        <div className='d-grid'>
          <button className='btn mb-3' style={{background:"#ffc0cb"}}>Sign In</button>
        </div>
      </form>
      {/* <p className='text-end mt-2'>
      <Link style={{color:"black",textDecoration:'none'}} to='/admin/forgotPassword'>Forgot Password</Link> | 
      <Link style={{color:"black",textDecoration:'none'}} to='/admin/otpLoginEmail' className="ms-2">Otp Login</Link>
      </p> */}
      <div className="text-center border-dashed border-2 border-gray-600">
         <p>Email: {`nayeem@gmail.com`}</p>
         <p>Password: {`N@1212`}</p>
      </div>
    </div>
  </div>
  )
}

export default AdminLogin