import React, { useState } from 'react';
import axios from 'axios';
import Layout from './Layout';

function Clipboard() {
  const [text, setText] = useState('');
  const [clipboard_text, setClipboard_text] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('https://back-end-short-link.onrender.com/clipboard', { clipboard_text:text });
    setClipboard_text(response.data.clipboard_short_url);
  };

  return (
    <Layout>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Save Text to Clipboard</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text"
            style={textareaStyle}
          />
          <button type="submit" style={submitButtonStyle}>Save to Clipboard</button>
        </form>
        {clipboard_text && (
          <div style={resultStyle}>
            <p>Your short URL: <a href={`https://front-shor-link.vercel.app/clipboard/${clipboard_text}`} style={linkStyle}>{`https://front-shor-link.vercel.app/clipboard/${clipboard_text}`}</a></p>
          </div>
        )}
      </div>
    </Layout>
  );
}

// Styles
const containerStyle = {
  textAlign: 'center',
  marginTop: '50px',
  maxWidth: '500px',
  margin: 'auto',
  padding: '20px',
  backgroundColor: '#f7f7f7',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const headingStyle = {
  marginBottom: '20px',
  fontSize: '24px',
  color: '#333',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const textareaStyle = {
  padding: '10px',
  width: '100%',
  height: '150px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '16px',
  marginBottom: '15px',
};

const submitButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007BFF',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
};

const resultStyle = {
  marginTop: '20px',
  textAlign: 'center',
};

const linkStyle = {
  color: '#007BFF',
  textDecoration: 'none',
  fontWeight: 'bold',
  cursor: 'pointer',
};

export default Clipboard;
