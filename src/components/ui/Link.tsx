import React from 'react';

interface LinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({ children, href, className = '' }) => {
  return (
    <a 
      href={href} 
      className={`transition duration-200 ${className}`}
    >
      {children}
    </a>
  );
};