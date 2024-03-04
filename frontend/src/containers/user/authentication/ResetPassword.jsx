import {useState} from 'react'
import {useNavigate,useLocation} from 'react-router-dom'
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../../../slices/userSlice/userApiSlices";

function ResetPassword() {
  let [password, setPassword] = useState("");
  let [confirmpassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  let { state } = useLocation();

  let [ResetPassword] = useResetPasswordMutation();

  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?!\s).{6,}$/;

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      if(passwordPattern.test(password)){
        if(password===confirmpassword){
          let res = await ResetPassword({ state, password }).unwrap();
          toast('Password successfully changed')
          navigate("/login");
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
    <div className="flex justify-center items-center h-screen text-violet-800"
    style={{
      
      backgroundImage: 'url("/images/login2.jpg")', 
      backgroundSize: 'cover',  // Adjust as needed
      backgroundRepeat: 'no-repeat',  // Adjust as needed
    }}>

        <div className="w-96 rounded-lg shadow-lg p-6 bg-white">
          <h1 className="text-3xl font-semibold mb-4 text-center">
            Reset password
          </h1>
          <form onSubmit={resetPassword}>
            <div className="mb-4">
              <label htmlFor="OTP" className="block ">
                New Password
              </label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="OTP" className="block ">
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
  style={{ border: 'none', borderRadius: '0.25rem', padding: '0.625rem 1.25rem',  marginTop: '1rem', transition: 'background-color 0.3s ease', }}
  className="btn-send-otp font-semibold text-violet-100 bg-violet-900 hover:bg-violet-800">
              Reset Password
            </button>
          </form>
        </div>
      </div>
  
  );
}

export default ResetPassword