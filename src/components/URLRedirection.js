import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';
import { useParams } from 'react-router-dom';

function URLRedirection() {
  const {short} = useParams();
  const [redirectUrl, setRedirectUrl] = useState('');

  useEffect(() => { 
    const handleSubmit = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/${short}`);
      setRedirectUrl(response.request.responseURL);
      console.log(response.request.responseURL)
    } catch (error) {
    }
  };

    handleSubmit();
  }, [redirectUrl]);

  return (
    <Layout>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Redirect from Short URL</h2>
        {redirectUrl && (
          <div style={resultStyle}>
            <p>Redirecting to: <a href={`http://localhost:3001/${redirectUrl}`} style={linkStyle}>{redirectUrl}</a></p>
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


const resultStyle = {
  marginTop: '20px',
  textAlign: 'center',
};

const linkStyle = {
  color: '#007BFF',
  textDecoration: 'none',
  fontWeight: 'bold',
};

export default URLRedirection;
