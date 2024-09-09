import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Layout from './Layout';

function ClipboardViewer() {
  const { clipboard_short_url } = useParams();
  const [clipboardText, setClipboardText] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // New state for success message
  const [loading, setLoading] = useState(true);
  const [updatedText, setUpdatedText] = useState('');

  useEffect(() => {
    const fetchClipboard = async () => {
      try {
        const response = await axios.get(`https://back-end-short-link.onrender.com/clipboard/${clipboard_short_url}`);
        setClipboardText(response.data.clipboard_text);
        setUpdatedText(response.data.clipboard_text); // Initialize updatedText
      } catch (err) {
        setError('Clipboard not found or an error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchClipboard();
  }, [clipboard_short_url]);

  const handleTextareaChange = (e) => {
    setUpdatedText(e.target.value);
  };

  const handleUpdateClick = async () => {
    try {
      await axios.put(`https://back-end-short-link.onrender.com/clipboard/${clipboard_short_url}`, { clipboard_text: updatedText });
      setClipboardText(updatedText);
      setSuccess('Clipboard updated successfully!'); 
    } catch (err) {
      setError('Failed to update clipboard text.');
    }
  };

  return (
    <Layout>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Clipboard Content</h2>

        {loading && <p>Loading...</p>}
        
        {error && <p style={errorStyle}>{error}</p>}

        <textarea
          value={updatedText}
          onChange={handleTextareaChange}
          style={textareaStyle}
        />
          <button onClick={handleUpdateClick} style={updateButtonStyle}>Update</button>
          {success && <p style={successStyle}>{success}</p>} {/* Display success message */}
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

const textareaStyle = {
  width: '100%',
  height: '200px',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '16px',
  marginBottom: '10px',
};

const updateButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007BFF',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
};

const errorStyle = {
  color: 'red',
  marginTop: '10px',
};
const successStyle = {
    color: 'green',
    marginTop: '10px',
  };

export default ClipboardViewer;
