import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {axiosInstance} from '../../utils/tutorAxios';


function TutorPasswordReset() {
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const { state } = useLocation();
 
  
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?!\s).{6,}$/;
  
    const resetPassword = async (e) => {
      e.preventDefault();
      try {
        if(passwordPattern.test(password)){
          if(password===confirmpassword){
            const res =await axiosInstance.put(`/resetPassword`,{ state, password })
            // const res = await ResetPassword({ state, password }).unwrap();
            toast.success('Password successfully changed')
            navigate("/tutor/login");
          }else{
            toast.error('Please check confirm password')
          }
        }else{
          toast.error('Please create a strong password')
        }
      } catch (error) {
        toast.error(error.data);
      }
      // const handleBackButton = () => {
      //   history.push("/");
      // };
    };
  
    
    return (
      <div className="flex justify-center items-center h-screen" style={{backgroundColor:'#33363d'}}>
  
          <div className="w-96 rounded-lg shadow-lg p-6 " style={{backgroundColor:'#ffc0cb'}}>
            <h1 className="text-3xl font-semibold mb-4 text-center">
              Reset password
            </h1>
            <form onSubmit={resetPassword}>
              <div className="mb-4">
                <label htmlFor="OTP" className="block text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="OTP" className="block text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
  
              <button
    type="submit"
    style={{backgroundColor: 'grey', color: 'white', border: 'none', borderRadius: '0.25rem', padding: '0.625rem 1.25rem',  marginTop: '1rem', transition: 'background-color 0.3s ease', }}
    className="btn-send-otp">
                Reset Password
              </button>
            </form>
          </div>
        </div>
    
    );
  }

export default TutorPasswordReset