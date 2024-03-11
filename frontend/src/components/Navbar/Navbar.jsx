import{ useEffect, useState } from "react";
import "./Navbar.css";
import img from "../../assets/E-learning.svg";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/userSlice/authSlice";
import axiosInstance from "../../containers/utils/axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt,faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { motion } from "framer-motion";


const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { id: 1, text: 'Home', path: '/' },
    { id: 4, text: 'Lives', path: '/lives' },
    { id: 3, text: 'Courses', path: '/courses' },
    { id: 2, text: 'Plans', path: '/plans' },
    
  ];
  
  const currentLink=navLinks.filter((item)=>item?.path===location?.pathname)
  const [currentActive, setCurrentActive] = useState(currentLink[0]?currentLink[0].id:0);
  const handleMobileMenuClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleClick = (index) => {
    setCurrentActive(index);
    if (window.innerWidth <= 999) {
      handleMobileMenuClick();
    }
  };

  const logoutFunction = async () => {
    try {
      await axiosInstance.post('/logout');
      setCurrentActive(0)
      dispatch(logout());
   
      navigate('/login');
    } catch (error) {
      toast.error(error?.error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 999) {
        // Close the mobile menu when the screen size is larger
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <nav className={`navbar-home rounded-b-md`}>
        <a href="#">
          <img src={img} alt="Logo" />
        </a>
        <div>
          <ul id="navbar" className={mobileMenuOpen ? 'active' : ''}>
            {navLinks.map((link) => (
               <li key={link.id} onClick={()=>handleClick(link.id)}>
               <Link
                 to={link.path}
                 className={link.id === currentActive ? 'active-link' : ''}
               >
                 {link.text}
               </Link>
             </li>
            ))}
            {userInfo ? (
              <>
 

 <li>
  <button onClick={logoutFunction} className="logout-button">
  <FontAwesomeIcon icon={faSignOutAlt} />
  </button>
</li>
<motion.li className="ml-20" animate={{x:-70,scale:1}} initial={{scale:0}}  transition={{duration:1.8}}>
  <Link to="/profile" className="profile-icon" onClick={()=>setCurrentActive(0)}>
    <img
      src="/images/aaron-burden-6jYoil2GhVk-unsplash.jpg"
      alt="User Profile"
      style={{
        width: '30px', // Adjust the width as needed
        height: '30px', // Adjust the height as needed
        borderRadius: '50%', // Makes it rounded
      }}
    />
  </Link>
</motion.li>
              </>
            ) : (
              <>
              <li>
                <Link to="/login" onClick={()=>setCurrentActive(0)}> <FontAwesomeIcon icon={faSignInAlt} /></Link>
              </li>
             
              </>
            )}
          </ul>
          {/* Toggle button for small screens */}
          <div id="toggle-button" onClick={handleMobileMenuClick}>
            <i
              id="bar"
              className={mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'}
            ></i>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;


