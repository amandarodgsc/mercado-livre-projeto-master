// src/components/Banner/Banner.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Banner.css';

const Banner = () => {
  const settings = {
    dots: true, 
    slidesToShow: 1, 
    slidesToScroll: 1, 
  };

  return (
    <div className="banner">
      <Slider {...settings}>
        <div>
          <img 
            src="https://http2.mlstatic.com/D_NQ_938152-MLA78305091572_082024-OO.webp" 
            alt="Product Banner 1" 
          />
        </div>
        <div>
          <img 
            src="https://http2.mlstatic.com/D_NQ_743097-MLA78131393550_082024-OO.webp" 
            alt="Product Banner 2" 
          />
        </div>
        <div>
          <img 
            src="https://http2.mlstatic.com/D_NQ_885969-MLA78536054543_082024-OO.webp" 
            alt="Product Banner 3" 
          />
        </div>
      </Slider>
    </div>
    
  );
};

export default Banner;
