import { FaHome, FaUser, FaChalkboardTeacher, FaBook, FaMoneyBillAlt, FaChartBar, FaEnvelope,  FaSignOutAlt, FaCertificate, FaTasks } from 'react-icons/fa';
import { RiLiveLine } from 'react-icons/ri';
import { GrSchedulePlay } from 'react-icons/gr';

import  { useEffect, useState } from 'react';
import '../../Components/Sidebar/AdminSidebar.css';
import TutorHeader from '../Header/TutorHeader';
import { useDispatch, useSelector } from 'react-redux';
import { TutorLogout } from '../../slices/tutorSlice/tutorAuthSlice';
import { NavLink } from 'react-router-dom';
// import tutorSvg from '../../assets/tutor.svg'


function TutorSidebar({ toggleSidebar }) {
  const [isIconsOnly, setIsIconsOnly] = useState(false);

  const toggleIconsOnly = () => {
    setIsIconsOnly(!isIconsOnly);
    toggleSidebar("tutor");
  };
  const dispatch=useDispatch()
  const {tutorInfo}=useSelector((state)=>state.tutorAuth)
  const handleLogout = () => {
    dispatch(TutorLogout())
   };
   const updateIsIconsOnly = () => {
    setIsIconsOnly(window.innerWidth <= 768);
  };

  useEffect(() => {
    // Initial check on component mount
    updateIsIconsOnly();

    // Add event listener for window resize
    window.addEventListener('resize', updateIsIconsOnly);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateIsIconsOnly);
    };
  }, []);
  return (
    <>
     <TutorHeader />
    {tutorInfo && <aside className={`admin-sidebar ${isIconsOnly ? 'icons-only' : ''}`} style={{backgroundColor:'#663399' ,borderRight: '2px solid grey' ,color:'white' }}>
        <div className="toggle-button" onClick={toggleIconsOnly}>
          {isIconsOnly ? '☰' : '✖'}
        </div>
        <ul>
        <li className="tutor-heading">
              {/* <img src={tutorSvg} style={{color:'white'}} alt="Tutor Icon" className={`tutor-icon ${isIconsOnly ? 'hidden' : ''}`} /> */}
              <span className={`menu-text ${isIconsOnly ? 'hidden' : ''} text-purple-400 font-bold`} style={{fontSize:'23px'}}>Tutor</span>
            </li>
        <NavLink to='/tutor' className="active-link" style={{ textDecoration: 'none', color: 'white' }}> <li>
            <FaHome className="sidebar-icon text-purple-400" />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''} text-purple-400 font-bold`}>Dashboard</span>
          </li></NavLink> 
          <NavLink to='/tutor/liveClasses' className="active-link" style={{ textDecoration: 'none', color: 'white' }}> <li>
            <RiLiveLine className={`sidebar-icon text-purple-400 ${isIconsOnly ? 'hidden' : ''}`} />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''} text-purple-400 font-bold`}>Live class</span>
          </li></NavLink> 

          {/* <NavLink to='/tutor/schedule' className="active-link" style={{ textDecoration: 'none'}}>  <li>
          <GrSchedulePlay
      style={{ color: 'purple' }}
      className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`}
    />            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''} text-purple-400 font-bold`}>Shedules</span>
          </li></NavLink>  */}
          <NavLink to='/tutor/quizManagement' className="active-link" style={{ textDecoration: 'none', color: 'white' }}>
  <li>
    <FaCertificate className={`sidebar-icon text-purple-400 ${isIconsOnly ? 'hidden' : ''}`} />
    <span className={`menu-text ${isIconsOnly ? 'hidden' : ''} text-purple-400 font-bold`}>Quiz Management</span>
  </li>
</NavLink>
<NavLink to='/tutor/assignmentManagement' className="active-link" style={{ textDecoration: 'none', color: 'white' }}>
  <li>
  <FaTasks className={`sidebar-icon text-purple-400 ${isIconsOnly ? 'hidden' : ''}`} />    <span className={`menu-text ${isIconsOnly ? 'hidden' : ''} text-purple-400 font-bold`}>Assignments</span>
  </li>
</NavLink>
          <NavLink to='/tutor/courseManagement' className="active-link" style={{ textDecoration: 'none', color: 'white' }}>  <li>
            <FaBook className={`sidebar-icon text-purple-400 ${isIconsOnly ? 'hidden' : ''}`} />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''} text-purple-400 font-bold`}>Course Management</span>
          </li></NavLink> 
          {/* <NavLink to='/tutor/message' className="active-link" style={{ textDecoration: 'none', color: 'white' }}>  <li>
            <FaEnvelope className={`sidebar-icon text-purple-400 ${isIconsOnly ? 'hidden' : ''}`} />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Messages</span>
          </li></NavLink>  */}
          <NavLink to='/tutor/profile' className="active-link" style={{ textDecoration: 'none', color: 'white' }}>
  <li>
    <FaUser className={`sidebar-icon text-purple-400 ${isIconsOnly ? 'hidden' : ''}`} />
    <span className={`menu-text ${isIconsOnly ? 'hidden' : ''} text-purple-400 font-bold`}>Profile</span>
  </li>
</NavLink>
           <li className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt className="sidebar-icon text-red-600" />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''} text-red-500 font-bold`}>Logout</span>
          </li>
        </ul>
      </aside> } 
    </>
  );
}

export default TutorSidebar