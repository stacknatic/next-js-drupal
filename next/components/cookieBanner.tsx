import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { ReactDOM } from 'react';
const CookieBanner = () => {
  const [cookieBannerActive, setCookieBannerActive] = useState(false);

  useEffect(() => {
    if (typeof Storage !== 'undefined') {
      if (!localStorage.getItem('cookieConsent') && window.location.href !== '/privacy-policy/') {
        setCookieBannerActive(true);
      
      }
    }
  }, []);

  const consent = () => {
    localStorage.setItem('cookieConsent', 'consented');
    setCookieBannerActive(false);
  };

  return (
    <div className={`cookie-banner bg-primary-500 ${cookieBannerActive ? 'active' : ''}`}>
      <div className='flex justify-center mt-1'>

      <a href="/" className="mx-auto" aria-label="Wunder logo"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 616.21 200" className="w-32"><path fill="currentColor" d="M518.24 27.44c-.11 1.3-.17 2.6-.17 3.88a42 42 0 0 0 12.16 30 41.57 41.57 0 0 0 24.69 11.84 52.77 52.77 0 0 1-10.75-31.64 51.54 51.54 0 0 1 .61-7.8 42.6 42.6 0 0 0-22.66-6.39c-1.29-.05-2.59 0-3.88.11zm33.48 5.91a46.74 46.74 0 0 0-.71 8.12 48.67 48.67 0 0 0 11.26 30.79c-.07-1.08-.11-2.15-.11-3.21a46.3 46.3 0 0 1 13.43-33 45.34 45.34 0 0 1 11.59-8.4A49 49 0 0 0 575.59 0a48.13 48.13 0 0 0-23.87 33.35z"></path><path fill="currentColor" d="M615.36 27.12c-1.29-.11-2.59-.17-3.87-.17a41.56 41.56 0 0 0-42.11 42.1c0 1.29 0 2.59.16 3.89 1.31.11 2.61.16 3.9.16A41.53 41.53 0 0 0 615.53 31c0-1.29-.05-2.59-.17-3.88zM599 91.7a50.14 50.14 0 0 0-73.55 67.5 49.16 49.16 0 0 0 4.17 4.93L565.48 200l35.84-35.87A50.11 50.11 0 0 0 599 91.7zm-401 16.74v61.33h-8.44a8.45 8.45 0 0 1-8.46-7.77 30.33 30.33 0 0 1-52.1-20.73V100h8.44a8.44 8.44 0 0 1 8.44 8.44V137c0 10.08 7.85 18.25 17.59 18.25s17.58-8.17 17.58-18.25v-37h8.44a8.44 8.44 0 0 1 8.51 8.44zm49.4-9.85a30 30 0 0 1 30.24 29.91v41.27h-8.44a8.44 8.44 0 0 1-8.44-8.44v-28.59c0-10.08-7.84-18.25-17.58-18.25s-17.58 8.17-17.58 18.25v37h-8.44a8.44 8.44 0 0 1-8.44-8.44V100h8.44a8.44 8.44 0 0 1 8.41 7.78 30.32 30.32 0 0 1 21.83-9.19zm110.73-18.84v90h-8.45a8.43 8.43 0 0 1-8.43-8.44v-.11a31.49 31.49 0 0 1-22.79 9.95c-18.31 0-33.06-16.2-33.06-36.22s14.75-36.36 33.06-36.36a31.44 31.44 0 0 1 22.79 10V71.31h8.43a8.44 8.44 0 0 1 8.45 8.44zm-16.46 55.17c0-11.32-8.79-20.43-19.69-20.43s-19.7 9.11-19.7 20.43 8.79 20.36 19.7 20.36 19.69-9.11 19.69-20.36zm144.78-27.74v7.95a60.16 60.16 0 0 0-7.35.6c-9.49 1.45-18.09 5.85-18.09 19.85l-.12 34.15h-8.44a8.44 8.44 0 0 1-8.44-8.44V100h8.44a8.43 8.43 0 0 1 8.28 6.82c5-5 11.2-8.25 17.07-8.25a8.66 8.66 0 0 1 8.65 8.65zM118.5 100a9.16 9.16 0 0 0-3.9 4.26l-19.25 40.05-19-39.7a8.46 8.46 0 0 0-15.18 0l-19 39.7-19-39.7a8.39 8.39 0 0 0-7.75-4.74H2.06l32.55 66.69a8.44 8.44 0 0 0 15.34-.37l18.85-38.64 19 39a8.43 8.43 0 0 0 15.34-.37l15.39-31.43zm285.01 70.93c-11.29 0-20.66-3.66-27.12-10.58-6.21-6.53-9.5-15.54-9.5-26a36 36 0 0 1 9.51-25c6.11-6.43 14.82-9.83 25.2-9.83 12.33 0 20 5.1 24.3 9.37 5.47 5.74 8.35 13.37 8.35 22.1v9.28h-49.59a19.52 19.52 0 0 0 4.67 10.7c3.56 4.14 8.82 6.32 15.21 6.32a31 31 0 0 0 13-2.86c.95-.43 1.76-.85 2.48-1.22 1.78-.92 3.18-1.65 5-1.65 3.58 0 6.48 3.17 6.48 7.07 0 4.39-4 6.75-7.43 8.32a52.55 52.55 0 0 1-20.56 3.98zm-18.86-42.82h33.06a16.89 16.89 0 0 0-4-10.13 16.49 16.49 0 0 0-12-4.68c-5.37 0-10.12 1.82-13 5a19.16 19.16 0 0 0-4.06 9.81z"></path></svg><span className="sr-only"></span></a>
      </div>
        
      <h2 className="text-center font-bold">We value your privacy</h2>
      <small>
        We use cookies and similar technologies. Some of the cookies are necessary for the functioning of this website
        and others are used to ensure the security of wunder.io and to prevent abuse. By using continuing, you
        agree to the use of cookies in accordance with the Privacy Policy of wunder.io. You can learn more about
        the use of cookies in the <Link href="#">Privacy Policy</Link>.
      </small>
      <div className="cookie-buttons-container">
        <button onClick={consent} className="action-button cookie-consent bg-white text-primary-500 p-1 ring-1 rounded-md">
          OK
        </button>
      </div>
    </div>
  );
};

export default CookieBanner

