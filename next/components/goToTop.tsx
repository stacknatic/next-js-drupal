'use client';
import React, { useState, useEffect } from 'react';
import gotToTop from '@/styles/goToTop.module.css';
import { FaCircleArrowUp } from "react-icons/fa6";

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Check the scroll position and update visibility
  const handleScroll = () => {
    const scrollTop = window.scrollY;

    // adjust the value (e.g., 100) to determine when the button appears
    setIsVisible(scrollTop > 100);
  };

  // Smoothly scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    // Attach the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {isVisible && (
      
        <FaCircleArrowUp className={`${gotToTop.goToTopButton}`} onClick={scrollToTop} />
      )}
    </div>
  );
};

export default GoToTopButton;
