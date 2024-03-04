
import React from "react";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsPinterest,
} from "react-icons/bs";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
    const linkStyle = {
        color: 'black', // Change the color to your desired color
        textDecoration: 'none',
        transition: 'color 0.3s', // Add a smooth color transition
      };
    
  return (
    <motion.div
      initial={{ height: 0 }}
      whileInView={{ height: "auto" }}
      
      className="bg-Teal"
    >
      <div className="px-5 py-4  grid md:grid-cols-3 overflow-none sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 place-items-start gap-4 text-slate-700 bg-white" >
        <div >
          <div className="font-bold mb-6">SkillSync</div>
          <p className="text-sm leading-7">
          Empowering Tomorrow's Leaders Today. Elevate your skills, embrace industry trends, and stay ahead in your learning journey   </p>
        </div>
     
        <div className="w-full flex items-center justify-center">
          <div >
          <div className="font-bold mb-6">Services</div>
          <div className="flex flex-col gap-4">
          <Link to="/lives" className="text-sm text-center hover:ring-1 hover:ring-gray-500 transition duration-300 rounded-full ease-in-out" style={linkStyle}>
        Lives
      </Link>
      <Link to="/courses" className="text-sm text-center hover:ring-1 hover:ring-gray-500 transition duration-300 rounded-full ease-in-out" style={linkStyle}>
       Courses
      </Link>
      <Link to="/plans" className="text-sm text-center hover:ring-1 hover:ring-gray-500 transition duration-300 rounded-full ease-in-out" style={linkStyle}>
       Plans
      </Link>
     
          </div>
        </div></div>
        
        <div className="w-full flex items-center justify-center">
        <div>
          <div className="font-bold mb-6">Follow us</div>
          <div className="text-xs text-center mb-4 hover:cursor-pointer hover:ring-1 hover:ring-gray-500 transition duration-300 rounded-full ease-in-out"><Link to="mailto:skillsyncwebsite@gmail.com">skillsyncwebsite@gmail.com</Link></div>
          <div className="text-sm">+918086905555</div>
          <div className="flex gap-4 mt-4">
          <Link to="/" className="hover:scale-110 text-xl">
        <BsFacebook />
      </Link>
      <Link to="/" className="hover:scale-110 text-xl">
        <BsInstagram />
      </Link>
      <Link to="/" className="hover:scale-110 text-xl" >
        <BsTwitter />
      </Link>
      <Link to="/" className="hover:scale-110 text-xl">
        <BsPinterest />
      </Link>
          </div>
        </div></div>
      </div>
    </motion.div>
  );
};

export default Footer;