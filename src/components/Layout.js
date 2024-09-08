import React from 'react';
import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <>
      <header style={headerStyle}>
        <h1 style={titleStyle}>URL Shortener Service</h1>
        <nav style={navStyle}>
          <Link to="/shortener" style={linkStyle}>
            <div style={boxStyle}>URL Shortener</div>
          </Link>
          <Link to="/links-list" style={linkStyle}>
            <div style={boxStyle}>Link Pad</div>
          </Link>
          <Link to="/clipboard" style={linkStyle}>
            <div style={boxStyle}>Clipboard</div>
          </Link>
        </nav>
      </header>
      <main style={mainStyle}>{children}</main>
    </>
  );
}

// Styles
const headerStyle = {
  textAlign: 'center',
  padding: '20px',
  backgroundColor: '#f7f7f7',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const titleStyle = {
  marginBottom: '20px',
  fontSize: '28px',
  color: '#333',
};

const navStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
};

const boxStyle = {
  padding: '15px 30px',
  border: '1px solid #ccc',
  borderRadius: '10px',
  backgroundColor: '#007BFF',
  color: '#fff',
  fontSize: '18px',
  fontWeight: 'bold',
  cursor: 'pointer',
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s ease',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#fff',
};

const mainStyle = {
  marginTop: '50px',
  padding: '20px',
  textAlign: 'center',
};

export default Layout;
