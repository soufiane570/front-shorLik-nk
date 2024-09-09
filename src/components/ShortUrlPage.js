import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Layout from './Layout';

function ShortUrlPage() {
  const { shortUrlLinks } = useParams(); // Extract shortUrl from route parameters
  const [linksList, setLinksList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLinksList = async () => {
      try {
        const response = await axios.get(`https://back-end-short-link.onrender.com/linklist/${shortUrlLinks}`);
        setLinksList(response.data.urls);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchLinksList();
  }, [shortUrlLinks]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Layout>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Links for Short URL: {`https://front-shor-link.vercel.app/l/${shortUrlLinks}`}</h2>
        {linksList.length === 0 ? (
          <p>No links found for this short URL.</p>
        ) : (
          <ul style={listStyle}>
            {linksList.map((link, index) => (
              <li key={index} style={listItemStyle}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  {link.title || link.url}
                </a>
                <p style={descriptionStyle}>{link.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}

// Styles
const containerStyle = {
  textAlign: 'center',
  marginTop: '50px',
  maxWidth: '726px',
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

const listStyle = {
  listStyleType: 'none',
  padding: '0',
};

const listItemStyle = {
  marginBottom: '15px',
  padding: '10px',
  backgroundColor: '#fff',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const linkStyle = {
  color: '#007BFF',
  textDecoration: 'none',
  fontWeight: 'bold',
};

const descriptionStyle = {
  color: '#555',
  marginTop: '5px',
};

export default ShortUrlPage;
