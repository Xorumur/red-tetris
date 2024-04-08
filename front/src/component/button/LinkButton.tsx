import React from 'react';
import "./LinkButton.css"

interface LinkButtonProps {
  children: JSX.Element;
  link: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const LinkButton = ({ children, link, disabled = false, onClick = () => {} }: LinkButtonProps) => {
  return (
    <a
      style={{
        ...(disabled
          ? {
              color: 'gray',
              cursor: 'not-allowed',
              opacity: 0.5,
            }
          : {
              background: 'purple',
            }),

      }}
      className='link-button'
      href={disabled ? '' : link}
      onClick={onClick}
      >
      {children}
    </a>
  );
};
