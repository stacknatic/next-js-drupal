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
      <h3 className="text-center font-bold">We value your privacy</h3>
      <small>
        We use cookies and similar technologies. Some of the cookies are necessary for the functioning of this website
        and others are used to ensure the security of wunder.io and to prevent abuse. By using continuing, you
        agree to the use of cookies in accordance with the Privacy Policy of wunder.io. You can learn more about
        the use of cookies in the <Link href="#">Privacy Policy</Link>.
      </small>
      <div className="cookie-buttons-container">
        <button onClick={consent} className="action-button cookie-consent">
          OK
        </button>
      </div>
    </div>
  );
};

export default CookieBanner

