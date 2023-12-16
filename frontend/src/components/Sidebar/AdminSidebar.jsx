

// AdminSidebar.js
import { useEffect, useState } from 'react';

import '../../Components/Sidebar/AdminSidebar.css';
import { NavLink } from 'react-router-dom'

import { FaHome, FaUser, FaChalkboardTeacher, FaBook, FaMoneyBillAlt, FaChartBar, FaEnvelope,  FaSignOutAlt } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md'

import AdminHeader from '../Header/AdminHeader';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout } from '../../slices/adminSlice/adminAuthSlice';


function AdminSidebar({ toggleSidebar }) {
  const [isIconsOnly, setIsIconsOnly] = useState(false);

  const toggleIconsOnly = () => {
    setIsIconsOnly(!isIconsOnly);
    toggleSidebar("admin");
  };
  
   const {adminInfo}=useSelector((state)=>state.adminAuth)
    
   const dispatch=useDispatch()
   
  const handleLogout = () => {
   dispatch(adminLogout())
  };
  const updateIsIconsOnly = () => {
    setIsIconsOnly(window.innerWidth <= 760);
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
          <AdminHeader/>
      {adminInfo &&  <aside className={`admin-sidebar ${isIconsOnly ? 'icons-only' : ''}`} style={{backgroundColor:'#663399' ,borderRight: '2px solid grey' ,color:'white' }}>
            <div className="toggle-button" onClick={toggleIconsOnly}>
              {isIconsOnly ? '☰' : '✖'}
            </div>
            <ul>
            <li className="tutor-heading">
              {/* <img src={tutorSvg} style={{color:'white'}} alt="Tutor Icon" className={`tutor-icon ${isIconsOnly ? 'hidden' : ''}`} /> */}
              <span className={`menu-text ${isIconsOnly ? 'hidden' : ''} text-purple-400 font-bold`} style={{fontSize:'23px'}}>Admin</span>
            </li>
            <NavLink to='/admin' className="active-link" style={{ textDecoration: 'none', color: 'black' }}>    <li>
              <FaHome className="sidebar-icon text-purple-400" />
                <span className={`menu-text ${isIconsOnly ? 'hidden' : ''} text-purple-400 font-bold`}>Dashboard</span>
              </li> </NavLink> 
              <NavLink to='/admin/userManagement' className="active-link" style={{ textDecoration: 'none', color: 'black' }}>   <li>
               <FaUser className={`sidebar-icon text-purple-400 ${isIconsOnly ? 'hidden' : ''}`} />
                <span className={`menu-text ${isIconsOnly ? 'hidden' : ''} text-purple-400 font-bold`}>User Management</span>
              </li> </NavLink>  
              <NavLink to='/admin/tutorManagement' className="active-link" style={{ textDecoration: 'none', color: 'black' }}>  <li>
               <FaChalkboardTeacher className={`sidebar-icon text-purple-400 ${isIconsOnly ? 'hidden' : ''}`} />
                <span className={`menu-text ${isIconsOnly ? 'hidden' : ''} text-purple-400 font-bold`}>Tutor Management</span>
              </li></NavLink>
              <NavLink to='/admin/courseManagement' className="active-link" style={{ textDecoration: 'none', color: 'black' }}> <li>
                
                <FaBook className={`sidebar-icon text-purple-400 ${isIconsOnly ? 'hidden' : ''}`} />
                <span className={`menu-text ${isIconsOnly ? 'hidden' : ''} text-purple-400 font-bold`}>Courses</span>
              </li> </NavLink> 
              <NavLink to='/admin/categoryManagement' className="active-link" style={{ textDecoration: 'none', color: 'black' }}>
  <li>
    <MdCategory className={`sidebar-icon text-purple-400 ${isIconsOnly ? 'hidden' : ''}`} />
    <span className={`menu-text ${isIconsOnly ? 'hidden' : ''} text-purple-400 font-bold`}>Category Management</span>
  </li>
</NavLink>
              <NavLink to='/admin/subscription' className="active-link" style={{ textDecoration: 'none', color: 'black' }}> <li>
                 <FaMoneyBillAlt className={`sidebar-icon text-purple-400 ${isIconsOnly ? 'hidden' : ''}`} />
                <span className={`menu-text ${isIconsOnly ? 'hidden' : ''} text-purple-400 font-bold`}>Subscription</span> 
              </li></NavLink> 
    
              {/* New li tags with corresponding icons */}
              <NavLink to='/admin/salesReport' className="active-link" style={{ textDecoration: 'none', color: 'black' }}>   <li>
                <FaChartBar className={`sidebar-icon text-purple-400 ${isIconsOnly ? 'hidden' : ''}`} />
                <span className={`menu-text ${isIconsOnly ? 'hidden' : ''} text-purple-400 font-bold`}>Sales Report</span> 
              </li></NavLink> 
             
               <li className="logout-button" onClick={handleLogout}>
                <FaSignOutAlt className="sidebar-icon" />
                <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Logout</span>
              </li>
            </ul>
          </aside> }
        </>
      );
   
}

export default AdminSidebar;