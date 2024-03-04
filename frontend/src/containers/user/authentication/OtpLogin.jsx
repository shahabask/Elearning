import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios'
import {axiosInstance as adminAxiosInstance} from '../../utils/adminAxios'
import {axiosInstance as tutorAxiosInstance} from '../../utils/tutorAxios'
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../slices/userSlice/authSlice';
import { setAdminCredentials } from '../../../slices/adminSlice/adminAuthSlice';
import { setTutorCredentials } from '../../../slices/tutorSlice/tutorAuthSlice';

function OtpLogin() {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const { state } = useLocation();
    const adminRoute = location.pathname.startsWith('/admin')
    const tutorRoute=location.pathname.startsWith('/tutor')

    const userType= adminRoute?"admin":tutorRoute?"tutor":"user"
  const dispatch=useDispatch()

    const verifyOTPHandler = async (e) => {
      e.preventDefault();
      try {
        
        if(userType=="user"){
        const res = await axiosInstance.post(`/otpLogin`,{ state, otp })
        dispatch(setCredentials({...res.data}))
        navigate("/")
        }else if(userType=="admin"){
            const res = await adminAxiosInstance.post(`/otpLogin`,{ state, otp })
            dispatch(setAdminCredentials({...res.data}))
            navigate("/admin/dashboard")
        }else{
            const res = await tutorAxiosInstance.post(`/otpLogin`,{ state, otp })
            dispatch(setTutorCredentials({...res.data}))
            navigate("/tutor/dashboard")
        }
      } catch (error) {
        
        toast.error(error?.response?.data||error.error);
      }
    };
  
  
    return (
      <div className="flex justify-center items-center h-screen text-violet-800"
      style={{
        
        backgroundImage: 'url("/images/login2.jpg")', 
        backgroundSize: 'cover',  // Adjust as needed
        backgroundRepeat: 'no-repeat',  // Adjust as needed
      }}>
  
          <div className="w-96 rounded-lg shadow-lg p-6 bg-white" >
            <h1 className="text-3xl font-semibold mb-4 text-center">
              Verify OTP
            </h1>
            <form onSubmit={verifyOTPHandler}>
              <div className="mb-4">
                <div className="">
                  <label htmlFor="OTP" className="block text-gray-700 mt-2 mr-2">
                    Otp
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 mr-2"
                  />
                  {/* <button className='text-blue'>Resend</button> */}
                  <button className=" mt-2" >
                    Resend
                  </button>
                </div>
              </div>
  
              <button
    type="submit"
    style={{ border: 'none', borderRadius: '0.25rem', padding: '0.625rem 1.25rem',  marginTop: '1rem', transition: 'background-color 0.3s ease', }}
    className="btn-send-otp font-semibold text-violet-100 bg-violet-900 hover:bg-violet-800"
  >
                Verify OTP
              </button>
            </form>
          </div>
        
      </div>
    );
  }
export default OtpLogin