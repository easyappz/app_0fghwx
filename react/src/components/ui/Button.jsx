import React from 'react';

const Button = ({ children, className = '', type = 'button', ...props }) => {
  return (
    <button
      data-easytag="id1-react/src/components/ui/Button.jsx"
      type={type}
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2 bg-accent text-white hover:opacity-90 active:opacity-80 shadow-soft transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
