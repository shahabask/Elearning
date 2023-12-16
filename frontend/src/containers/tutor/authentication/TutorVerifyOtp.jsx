import { useState } from "react";
import {useNavigate ,useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import {axiosInstance} from "../../utils/tutorAxios";

function TutorVerifyOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();



  const verifyOTPHandler = async (e) => {
    e.preventDefault();
    try {
 
      const res = await axiosInstance.post(`/verifyOtp`,{state,otp})
       
      navigate("/tutor/login/resetPassword", { state: state });
    } catch (error) {
      log(error)
      toast.error(error?.response?.data||error.error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen" style={{backgroundColor:'#33363d'}}>

        <div className="w-96 rounded-lg shadow-lg p-6 " style={{backgroundColor:'#ffc0cb'}}>
          <h1 className="text-3xl font-semibold mb-4 text-center">
            Verify OTP
          </h1>
          <form onSubmit={verifyOTPHandler}>
            <div className="mb-4">
              <div className="flex">
                <label htmlFor="OTP" className="block text-gray-700 mt-2 mr-2">
                  Otp
                </label>
                <input
                  type="text"
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 mr-2"
                />
                {/* <button className='text-blue'>Resend</button> */}
                <button className="text-blue-500 mt-2" >
                  Resend
                </button>
              </div>
            </div>

            <button
  type="submit"
  style={{backgroundColor: 'grey', color: 'white', border: 'none', borderRadius: '0.25rem', padding: '0.625rem 1.25rem',  marginTop: '1rem', transition: 'background-color 0.3s ease', }}
  className="btn-send-otp"
>
              Verify OTP
            </button>
          </form>
        </div>
      </div>

  );
}

export default TutorVerifyOtp