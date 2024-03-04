import "./UserLogin.css";
import { Link, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useLoginMutation } from "../../../slices/userSlice/userApiSlices";
import { setCredentials } from "../../../slices/userSlice/authSlice";
import { toast } from 'react-toastify';
import { motion } from "framer-motion";
     
function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors,setFormErrors]=useState({})

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);



  useEffect(() => {

    if (userInfo) {
    
      navigate("/");
    }
  },[navigate,userInfo]); 

  useEffect(()=>{
    if(Object.keys(formErrors).length==0){
        console.log()
    }
  },[formErrors])
  const submitHandler = async (e) => {
    e.preventDefault();
        setFormErrors(validate(email,password))

 try {
  const localFormErrors=validate(email,password)
  if(Object.keys(localFormErrors).length==0){
   const res = await login({ email,password }).unwrap();
      
      dispatch(setCredentials({ ...res }));
      
      navigate('/');
      toast.success('Successfully Logged In')
    }
    } catch (err) {

      toast.error(err?.data|| err?.error);

    }

  };

  const validate=(email,password)=>{

    const errors={}
    const regex= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if(!email)  {
       errors.email='Email is required'
      }else if(!regex.test(email)){
        errors.email='This is an invalid email'
      }
      if(!password){
        errors.password='Password is required'
      }else if(password.length<6){
        errors.password='Invalid Password'
      }
      return errors
  }
  return (
    <div
      className="login template d-flex justify-content-center align-items-center vh-100 text-violet-800"
      style={{
        
        backgroundImage: 'url("/images/login2.jpg")', 
        backgroundSize: 'cover',  // Adjust as needed
        backgroundRepeat: 'no-repeat',  // Adjust as needed
      }}
    >
      <div className="p-5 rounded w-30 md:w-45 sm:w-90  bg-white shadow-lg">

       
      <form onSubmit={submitHandler}>
          <motion.h3 initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2}} className="text-center font-bold text-3xl mb-2">Sign In</motion.h3>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="form-control text-violet-300"
            />
            {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="form-control"
            />
            <p style={{color:'red'}}>{formErrors.password}</p>
          </div>
        
          <div className="d-grid">
            <button className="py-2 rounded-lg mb-3 font-semibold text-violet-100 bg-violet-900 hover:bg-violet-800" >
              Sign In
            </button>
          </div>
          <div className="text-center mt-2 text-sm">
      <p className='link'>
        <Link style={{textDecoration:'none'}} to='/forgotPassword'>Forgot Password </Link> |  <Link style={{textDecoration:'none'}} to='/otpLoginEmail' className="ms-2">Otp Login</Link>
      </p>
    
    </div>
        </form>
        <div className="links-container text-center mt-2">
        <p >
        <Link style={{textDecoration:'none'}} to="/register" className="mb-6 ms-2 text-sm">Sign up</Link>
       
      </p>
       <hr className="my-4" />
      <p>
      <Link style={{textDecoration:'none'}} to="/tutor" className="mt-6  text-sm">Are you a tutor? Login</Link>
      </p>
      </div>
      
    
    <div className="text-center border-dotted border-2 border-gray-600 text-sm">
      
         <p>Email: {`shahabas@gmail.com`}</p>
         <p>Password: {`S@1212`}</p>
      </div>
    </div>
    </div>
  );
}

export default UserLogin;
