import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Layout from './Layout';

function ShortUrlPage() {
  const { short_link } = useParams(); // Extract shortUrl from route parameters
  const [linksList, setLinksList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLinksList = async () => {
      try {
        const response = await axios.get(`https://back-end-short-link.onrender.com/linklist/${short_link}`);
        console.log(response.data);
        setLinksList(response.data.urls);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };
    document.title = `List Link of ur Shor Link : https://front-shor-link.vercel.app/linklist/${short_link}`
    fetchLinksList();
  }, [short_link]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

  return (
    <Layout>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Links for Short URL: {`https://front-shor-link.vercel.app/linklist/${short_link}`}</h2>
        {linksList.length === 0 ? (
          <p>No links found for this short URL.</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th>Title</th>
                <th>URL</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {linksList.map((link, index) => (
                <tr key={index}>
                  <td>{link.title || 'No Title'}</td>
                  <td>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                      {link.url}
                    </a>
                  </td>
                  <td>{link.description || 'No Description'}</td>
                </tr>
              ))}
            </tbody>
          </table>
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

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

const linkStyle = {
  color: '#007BFF',
  textDecoration: 'none',
  fontWeight: 'bold',
};
export default ShortUrlPage;
