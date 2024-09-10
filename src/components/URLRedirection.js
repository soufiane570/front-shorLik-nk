import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function URLRedirection() {
  const {short_url} = useParams();
  // const [redirectUrl, setRedirectUrl] = useState('');

  useEffect(() => {
    const redirect = async () => {
      try {
        // Fetch the URL from the backend
        const response = await fetch(`https://back-end-short-link.onrender.com/${short_url}`);
        const result = await response.json();
        // Redirect to the original URL
        window.location.href = result.original_url;
      } catch (error) {
        console.error('Error redirecting:', error);
      }
    };

    redirect();
  }, [short_url]);

  return (
    <div style={containerStyle}>
    <h2 style={headingStyle}>Redirecting...</h2>
    {/* Optionally, you can show a loading message */}
    <p>Please wait while we redirect you...</p>
  </div>
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


export default URLRedirection;
