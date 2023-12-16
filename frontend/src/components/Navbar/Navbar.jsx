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



const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentActive, setCurrentActive] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const isHomeRoute = location.pathname === '/'
  const navLinks = [
    { id: 1, text: 'Home', path: '/' },
    { id: 4, text: 'Lives', path: '/lives' },
    { id: 3, text: 'Courses', path: '/courses' },
    { id: 2, text: 'Plans', path: '/plans' },
    
  ];

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
      const res = await axiosInstance.post('/logout');
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
      <nav className={`navbar${isHomeRoute ? '-home' : ''}`}>
        <a href="#">
          <img src={img} alt="Logo" />
        </a>
        <div>
          <ul id="navbar" className={mobileMenuOpen ? 'active' : ''}>
            {navLinks.map((link, index) => (
              <li key={link.id}>
                <Link
                  to={link.path}
                  className={index === currentActive ? 'active-link' : ''}
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
                <li>
  <Link to="/profile" className="profile-icon">
    <img
      src="/public/images/aaron-burden-6jYoil2GhVk-unsplash.jpg"
      alt="User Profile"
      style={{
        width: '30px', // Adjust the width as needed
        height: '30px', // Adjust the height as needed
        borderRadius: '50%', // Makes it rounded
      }}
    />
  </Link>
</li>
              </>
            ) : (
              <>
              <li>
                <Link to="/login"> <FontAwesomeIcon icon={faSignInAlt} /></Link>
              </li>
              {/* <li>
  <Link to="/login" className="profile-icon">
    <span role="img" aria-label="user">👤</span>
  </Link>
</li> */}
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


