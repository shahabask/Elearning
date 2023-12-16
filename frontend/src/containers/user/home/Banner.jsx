import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Banner.css'

import{ useEffect, useState } from 'react';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const images = [
 
  
  '/images/aaron-burden-6jYoil2GhVk-unsplash.jpg',
  '/images/annie-spratt-QckxruozjRg-unsplash.jpg',
  '/images/Executives at Davos Are Eager for Automation - Truthdig.jpeg',
  // Add more image URLs as needed
];



const ImageCarousel = () => {
  return (
    <div className="banner">
      <div style={{height:'100px'}}>

      </div>
  <Carousel autoPlay infiniteLoop showStatus={false} showThumbs={false}>
    {images.map((image, index) => (
      <div key={index}>
        <img
          src={image}
          alt={`Image ${index + 1}`}
          className="carousel-image"
        />
      </div>
    ))}
  </Carousel>

</div>

  );
};

export default ImageCarousel;

