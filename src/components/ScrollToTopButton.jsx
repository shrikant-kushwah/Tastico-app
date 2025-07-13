import React, { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 bg-pink-700 hover:bg-pink-600 text-white text-xl p-3 rounded-full shadow-lg transition-opacity duration-300"
        aria-label="Scroll to top"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    )
  );
};

export default ScrollToTopButton;
