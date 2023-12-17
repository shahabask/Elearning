
import Navbar from "../components/Navbar/Navbar"
import AdminSidebar from "../components/Sidebar/adminSidebar"
import TutorSidebar from "../components/Sidebar/tutorSidebar"
import Router from "../containers/routes/Router"
import { useLocation } from "react-router-dom"
import './Layout.css'
import { useState } from "react"
import { useSelector } from "react-redux"
import Footer from "../containers/user/home/Footer"


function Layout() {

  const location=useLocation( )
  const tutor=location.pathname.startsWith("/tutor")
  const admin=location.pathname.startsWith("/admin")
const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const {adminInfo}=useSelector((state)=>state.adminAuth)
  const {tutorInfo}=useSelector((state)=>state.tutorAuth)

  function checkIfErrorPage() {
    const errorRoutes = ['/error', '/404', '/500']; // Add the error route paths here
    return errorRoutes.includes(window.location.pathname);
  }
  const toggleSidebar = (sidebarType) => {
    setIsSidebarOpen((prevIsSidebarOpen) => {
      // Check the sidebarType to identify which sidebar is making the update
      if (sidebarType === "admin" && admin) {
        return !prevIsSidebarOpen;
      } else if (sidebarType === "tutor" && tutor) {
        
        return !prevIsSidebarOpen;
      }
      return prevIsSidebarOpen;
    });
  };

 if(admin){
    return (
      <>
      
       <AdminSidebar toggleSidebar={toggleSidebar}/>
      <div className={adminInfo ? `content-container ${isSidebarOpen ? '' : 'no-left-padding'}` : ''} >
      <Router   />
      </div>
      </>
        )
  }else if(tutor){
    return (
      <>
      
       <TutorSidebar toggleSidebar={toggleSidebar}/>
       
       <div className={tutorInfo ? `content-container ${isSidebarOpen ? '' : 'no-left-padding'}` : ''} >
      <Router />
      </div>
      </>
        )
  }else{
    return (
      <>
     {  <Navbar />}
      
        <Router/>
        <Footer/>
      </>
        )
  }
 
}

export default Layout