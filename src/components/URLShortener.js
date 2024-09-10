import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';
import { QRCodeSVG } from 'qrcode.react';



function URLShortener() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [expiry, setExpiry] = useState('1m');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const isValidURL = (urlString) => {
    const pattern = new RegExp(
      '^(https?:\\/\\/)' + // Protocol (either http or https)
      '((([a-zA-Z0-9$-_.+!*\'(),]|%[0-9a-fA-F]{2})+@)?' + // Authentication (optional)
      '((\\d{1,3}\\.){3}\\d{1,3}|' + // IPv4 address or...
      '([a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\\.)*[a-zA-Z]{2,6})|' + // Hostname or domain
      'localhost)' + // Allow "localhost"
      '(:\\d{1,5})?' + // Port number (optional)
      '(\\/[^\\s]*)?' + // Path (optional)
      '(\\?.*)?' + // Query string (optional)
      '(#.*)?$', // Fragment (optional)
      'i'
    );
    return pattern.test(urlString);
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error messages

    if (!isValidURL(url)) {
      setError('Please enter a valid URL');
      return;
    }

    try {
      const response = await axios.post('https://back-end-short-link.onrender.com/shorten', { original_url: url, expiry });
      setShortUrl(response.data.short_url);
      console.log(response.data)
    } catch (error) {
      setError('Failed to shorten the URL. Please try again.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://front-shor-link.vercel.app/shortener/`+shortUrl);
    setCopySuccess('Copied!');
    setTimeout(() => setCopySuccess(''), 2000); // Reset message after 2 seconds
  };

  useEffect(() => {
    document.title = "URL Shortener"
 }, []);
  return (
    <Layout>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Shorten your URL</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your URL"
            style={inputStyle}
          />
          <select 
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            style={selectStyle}
          >
            {/* <option value="1h">1 Hour</option>
            <option value="1d">1 Day</option> */}
            <option value="1w">1 Week</option>
            <option value="1m">1 Month</option>
            <option value="1y">1 Year</option>
            <option value="lifetime">Lifetime</option>
          </select>
          <button type="submit" style={submitButtonStyle}>Shorten</button>
        </form>

        {error && <p style={errorStyle}>{error}</p>}

        {shortUrl && (
          <div style={resultStyle}>
            <p>Your short URL: <a target='_blank' rel="noopener noreferrer" href={`https://front-shor-link.vercel.app/shortener/${shortUrl}`} onClick={handleCopy} style={linkStyle}>{`https://front-shor-link.vercel.app/shortener/${shortUrl}`}</a></p>
            <div style={qrContainerStyle}>
              <QRCodeSVG value={`https://front-shor-link.vercel.app/shortener/${shortUrl}`} size={128} style={qrStyle} />
            </div>
            <button onClick={handleCopy} style={copyButtonStyle}>Copy URL</button>
            {copySuccess && <p style={copySuccessStyle}>{copySuccess}</p>}
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

const inputStyle = {
  padding: '10px',
  width: '100%',
  marginBottom: '15px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '16px',
};

const selectStyle = {
  padding: '10px',
  width: '100%',
  marginBottom: '15px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '16px',
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

const copyButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px',
  fontSize: '16px',
};

const copySuccessStyle = {
  color: 'green',
  marginTop: '10px',
};

const errorStyle = {
  color: 'red',
  marginTop: '10px',
};
const qrStyle = {
  margin: '0 auto',
};
const qrContainerStyle = {
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export default URLShortener;
