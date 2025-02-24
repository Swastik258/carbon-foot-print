import React from 'react'

const Logo = ({ className = 'h-12 w-12' }) => (
    <svg 
      className={className}
      viewBox="0 0 512 512"
      aria-label="Emberate Logo"
    >
      {/* Your SVG paths here */}
      <path fill="currentColor" d="M256..." />
    </svg>
  );
  
  export default Logo;