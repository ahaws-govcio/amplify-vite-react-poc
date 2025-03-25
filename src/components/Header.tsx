import { useState } from 'react';

interface HeaderProps {
  user: {
    attributes: {
      given_name: string;
      family_name: string;
    };
  };
  onSignOut: () => void;
}

export function Header({ user, onSignOut }: HeaderProps) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log(user);
//   const userName = `${user.attributes.given_name} ${user.attributes.family_name}`;

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src="/vite.svg" 
          alt="Logo" 
          style={{ height: '32px', marginRight: '0.5rem' }}
        />
        <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Todo App</span>
      </div>

      {/* User Menu */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#f3f4f6',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#4f46e5',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
          }}>
            {/* {user.attributes.given_name.charAt(0).toUpperCase()} */}
            A
          </div>
          {/* <span>{userName}</span> */}
          <span style={{ fontSize: '0.75rem' }}>▼</span>
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '0.5rem',
            backgroundColor: 'white',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            minWidth: '200px',
          }}>
            <button
              onClick={onSignOut}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: 'none',
                backgroundColor: 'transparent',
                textAlign: 'left',
                cursor: 'pointer',
                color: '#ef4444',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span>🚪</span> Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
} 