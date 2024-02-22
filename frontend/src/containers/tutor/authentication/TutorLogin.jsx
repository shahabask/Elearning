import "../../user/authentication/UserLogin.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setTutorCredentials } from "../../../slices/tutorSlice/tutorAuthSlice";
// import { useTutorLoginMutation } from '../../../slices/tutorSlice/tutorApiSlice';
import { axiosInstance } from "../../utils/tutorAxios";
import axios from "axios";

function TutorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { tutorInfo } = useSelector((state) => state.tutorAuth);

  useEffect(() => {
    if (tutorInfo) {
      navigate("/tutor");
    }
  }, [navigate, tutorInfo]);

  useEffect(() => {
    if (Object.keys(formErrors).length == 0 && isSubmit) {
      console.log();
    }
  }, [formErrors]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setFormErrors(validate(email, password));
    setIsSubmit(true);
    try {
      const res = await axios.post(`https://www.skillsync.website/api/tutor/login`, {
        email,
        password,
      });

      dispatch(setTutorCredentials({ ...res.data }));

      navigate("/tutor/dashboard");
    } catch (error) {
      toast.error(error?.res?.data || error.error);
    }
  };

  const validate = (email, password) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email) {
      errors.email = "Email is required";
    } else if (!regex.test(email)) {
      errors.email = "This is an invalid email";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be more than or equal to 6 characters";
    } else if (password.length > 10) {
      errors.password = "Password must be less than or equal to 10 characters";
    }
    return errors;
  };
  return (
    <div className="login template d-flex justify-content-center align-items-center vh-100 ">
      <div className="p-5 rounded w-30 md:w-45 sm:w-90 border shadow-lg">
        <form onSubmit={submitHandler}>
          <h3 className="text-center">Tutor Login</h3>
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
            <p style={{ color: "red" }}>{formErrors.email}</p>
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
            <p style={{ color: "red" }}>{formErrors.password}</p>
          </div>
          <div className="d-grid">
            <button
              className="btn mb-3"
              style={{ backgroundColor: "grey", color: "white" }}
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="text-end mt-2">
          <Link
            style={{ color: "black", textDecoration: "none" }}
            to="/tutor/login/forgotPassword"
          >
            Forgot Password
          </Link>{" "}
          |{" "}
          <Link
            to="/tutor/login/register"
            style={{ color: "black", textDecoration: "none" }}
            className="ms-2"
          >
            Sign up
          </Link>
        </p>
        <p className="text-end mt-2">
          <Link
            style={{ color: "black", textDecoration: "none" }}
            to="/tutor/login/otpLoginEmail"
            className="ms-2"
          >
            Otp Login
          </Link>
        </p>
        <div>
        <span>Trail Data:</span>
        </div>
        <div className="text-center border-dotted border-2 border-gray-600">
        
         <p>Email: {`nayeem@gmail.com`}</p>
         <p>Password: {`N@1212`}</p>
      </div>
      </div>
    </div>
  );
}

export default TutorLogin;
