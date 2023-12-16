import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axiosInstance from '../../utils/axios'
import {axiosInstance as adminAxiosInstance} from '../../utils/adminAxios'
import {axiosInstance as tutorAxiosInstance} from '../../utils/tutorAxios'

function OtpLoginEmail() {
    const [email,setEmail]=useState('')
    const location = useLocation()

    const adminRoute = location.pathname.startsWith('/admin')
    const tutorRoute=location.pathname.startsWith('/tutor')

    const userType= adminRoute?"admin":tutorRoute?"tutor":"user"
//    const {userInfo}=useSelector((state)=>state.auth)
  const navigate=useNavigate()
//    useEffect(()=>{
//     if(userInfo){
//         navigate('/')
//     }
//    },[navigate,userInfo])
    

    const otpLoginEmailSubmitHandler=async(e)=>{
      e.preventDefault()
      
      
      try {
        console.log('userType',userType)
        if(userType=="user"){
            const res=await axiosInstance.post('/otpLoginVerifyEmail',{email})
        console.log(res)
        navigate('/otpLogin',{state:email})
        }else if(userType=="admin"){
            const res=await adminAxiosInstance.post('/otpLoginVerifyEmail',{email})
            console.log(res)
            navigate('/admin/otpLogin',{state:email})
        }else{
            const res=await tutorAxiosInstance.post('/otpLoginVerifyEmail',{email})
            console.log(res)
            navigate('/tutor/otpLogin',{state:email})
        }
        
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data||error.error)
      }
    }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="login-form">
        <div className="w-96 rounded-lg shadow-lg p-6 ">
          <h1 className="text-3xl font-semibold text-black mb-4 text-center">
            OTP Login with Email
          </h1>
          <form onSubmit={otpLoginEmailSubmitHandler}>
          <div className="mb-4">
            <label htmlFor="Email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            
          </div>
          <button
  type="submit"
  style={{ backgroundColor: '#ffc0cb', color: 'dark-black', border: 'none', borderRadius: '0.25rem', padding: '0.625rem 1.25rem',  marginTop: '1rem', transition: 'background-color 0.3s ease', }}
  className="btn-send-otp"
>
  Send OTP
</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OtpLoginEmail