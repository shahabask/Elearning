
import '../../Components/Header/AdminHeader.css';
import { FaSearch } from 'react-icons/fa';
import img from "../../assets/E-learning.svg";
import { useSelector } from 'react-redux';


function AdminHeader() {

    const {adminInfo}=useSelector((state)=>state.adminAuth)
    if(adminInfo){
    return (
   <header className="admin-header bg-purple-400">
      <div className="logo">
        <img src={img} alt="Logo" />
      </div>
 
      <div className="profile-container">
        {/* Image added as a background to the profile-image div */}
        <div className="profile-image" style={{ backgroundImage: "url('https://imgv3.fotor.com/images/blog-cover-image/10-profile-picture-ideas-to-make-you-stand-out.jpg')" }}></div>
      </div>
    </header>
  );
}else{
  return(  <header className="admin-header">
      <div className="logo">
        <img src={img} alt="Logo" />
      </div>

    </header>)
}
}

export default AdminHeader;