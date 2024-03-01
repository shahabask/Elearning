import "./UserLogin.css";
import { Link, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useLoginMutation } from "../../../slices/userSlice/userApiSlices";
import { setCredentials } from "../../../slices/userSlice/authSlice";
import { toast } from 'react-toastify';

     
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
 if(Object.keys(formErrors).length==0){
  toast.success(Object.keys(formErrors).length==0)
 try {
      const res = await login({ email,password }).unwrap();
      
      dispatch(setCredentials({ ...res }));
      
      navigate('/');
     
    } catch (err) {

      // toast.error(err?.data|| err?.error);

    }
  }else{
    toast.success('please fill')
    return;
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
      }else if(password.length>10){
        errors.password='Invalid Password'
      }
      return errors
  }
  return (
    <div
      className="login template d-flex justify-content-center align-items-center vh-100 background-image"
    
    >
      <div className="p-5 rounded w-30 md:w-45 sm:w-90 border shadow-lg">

       
        <form onSubmit={submitHandler}>
          <h3 className="text-center">Sign In</h3>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="form-control"
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
            <button className="btn mb-3" style={{ background: "#ffc0cb" }}>
              Sign In
            </button>
          </div>
          <div className="text-end mt-2">
      <p className='link'>
        <Link style={{color:"black",textDecoration:'none'}} to='/forgotPassword'>Forgot Password ?</Link> |<Link style={{color:"black",textDecoration:'none'}} to="/register" className="ms-2">Sign up</Link>
      </p>
    
    </div>
        </form>
        <div className="links-container text-end mt-2">
        <p >
        <Link style={{color:"black",textDecoration:'none'}} to='/otpLoginEmail' className="ms-2">Otp Login</Link>
       
      </p>
      <p>
     
      </p>
      </div>
      
      <div>
        <span>Trail Data:</span>
        </div>
    <div className="text-center border-dotted border-2 border-gray-600">
      
         <p>Email: {`shahabas@gmail.com`}</p>
         <p>Password: {`S@1212`}</p>
      </div>
    </div>
    </div>
  );
}

export default UserLogin;
