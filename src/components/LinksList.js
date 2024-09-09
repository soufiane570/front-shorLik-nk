import React, { useState } from 'react';
import axios from 'axios';
import Layout from './Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {QRCodeSVG} from 'qrcode.react';

function LinksList() {
  const [links, setLinks] = useState([{ url: '', title: '', description: '' }]);
  const [shortUrl, setShortUrl] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const handleChange = (index, e) => {
    const newLinks = [...links];
    newLinks[index][e.target.name] = e.target.value;
    setLinks(newLinks);
  };

  const addLink = () => {
    setLinks([...links, { url: '', title: '', description: '' }]);
  };

  const handleDelete = (index) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://back-end-short-link.onrender.com/linklist', { 
        urls: links
      });

      setShortUrl(response.data.shortLink);
      setQrCodeUrl(`https://back-end-short-link.onrender.com/linklist/${response.data.shortLink}`);
    } catch (error) {
      console.error('Error generating short URL:', error);
    }
  };

  return (
    <Layout>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Generate a Short URL for Multiple Links</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          {links.map((link, index) => (
            <div key={index} style={inputGroupStyle}>
              <input
                type="text"
                name="title"
                value={link.title}
                onChange={(e) => handleChange(index, e)}
                placeholder="Title"
                style={inputStyle}
              />
              <input
                type="text"
                name="description"
                value={link.description}
                onChange={(e) => handleChange(index, e)}
                placeholder="Description"
                style={inputStyle}
              />
              <input
                type="text"
                name="url"
                value={link.url}
                onChange={(e) => handleChange(index, e)}
                placeholder="URL"
                style={inputStyle}
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  style={iconButtonStyle}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addLink} style={addButtonStyle}>Add Another Link</button>
          
          <button type="submit" style={submitButtonStyle}>Generate Short URL</button>
        </form>

        {/* Display the short URL */}
        {shortUrl && (
          <div style={resultStyle}>
            <p>Your short URL: <a href={`https://front-shor-link.vercel.app/linklist/${shortUrl}`} style={linkStyle} target='_blank' rel="noopener noreferrer" >{`https://back-end-short-link.onrender.com/linklist/${shortUrl}`}</a></p>
            <QRCodeSVG value={qrCodeUrl} size={150} />
          </div>
        )}
      </div>
    </Layout>
  );
}

// Styles (unchanged from your original code)
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

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
  marginBottom: '15px',
  alignItems: 'center',
  width: '100%',
};

const inputStyle = {
  padding: '10px',
  width: '200px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '16px',
};

const addButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginBottom: '10px',
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
};

const iconButtonStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: '#dc3545',
  fontSize: '20px',
};

export default LinksList;
