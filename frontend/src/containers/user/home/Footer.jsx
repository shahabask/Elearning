
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
      // transition={{ duration: 1 }}
      className="bg-Teal"
    >
      <div className="px-5 py-1 grid md:grid-cols-4 overflow-none sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 place-items-start gap-4 text-black" style={{backgroundColor:'#FDF8EE',border:'1px solid grey'}}>
        <div>
          <div className="font-bold mb-6">Book Store</div>
          <p className="text-sm leading-7">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo neque
            saepe cumque. Veritatis sunt commodi
          </p>
        </div>
        <div>
          <div className="font-bold mb-6">Services</div>
          <div className="flex flex-col gap-4">
          <Link to="/" className="text-sm" style={linkStyle}>
        Web Design
      </Link>
      <Link to="/" className="text-sm " style={linkStyle}>
        Web Development
      </Link>
      <Link to="/" className="text-sm" style={linkStyle}>
        Science
      </Link>
      <Link to="/" className="text-sm" style={linkStyle}>
        Digital Marketing
      </Link>
          </div>
        </div>
        <div >
          <div className="font-bold mb-6">Company</div>
          <div className="flex flex-col gap-4">
          <Link to="/" className="text-sm hover:underline" style={{ color: 'black', textDecoration: 'none' }}>
        Privacy Policy
      </Link>
      <Link to="/" className="text-sm hover:underline" style={{ color: 'black', textDecoration: 'none' }}>
        Sitemap
      </Link>
      <Link to="/" className="text-sm hover:underline" style={{ color: 'black', textDecoration: 'none' }}>
        Careers
      </Link>
      <Link to="/" className="text-sm hover:underline" style={{ color: 'black', textDecoration: 'none' }}>
        Terms & Conditions
      </Link>
          </div>
        </div>
        <div>
          <div className="font-bold mb-6">Follow us</div>
          <div className="text-xs mb-4">skillexlearning@gmail.com</div>
          <div className="text-sm">+959883271929</div>
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
        </div>
      </div>
    </motion.div>
  );
};

export default Footer;