import { useState, useEffect } from "react";
import "./cookieConsent.css";

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-consent-banner">
      <p>
        We use cookies to enhance your experience. By continuing to visit this
        site, you agree to our use of cookies. We do not do any tracking.{" "}
        <a href="/privacy" target="_blank" rel="noopener noreferrer">
          Learn more
        </a>
      </p>
      <button onClick={acceptCookies} className="cookie-consent-button">
        Accept
      </button>
    </div>
  );
};
