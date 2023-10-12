import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const MultiCarousel = ({ children, xl, desk, tab, mob }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: xl,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: desk,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: tab,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: mob,
    }
  };

  return (
    <Carousel
      responsive={responsive}
      // removeArrowOnDeviceType={["tablet", "mobile"]}
    >
      {children}
    </Carousel>
  );
};
export default MultiCarousel;
