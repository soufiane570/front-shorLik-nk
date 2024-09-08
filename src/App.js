import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import URLShortener from './components/URLShortener';
import LinksList from './components/LinksList';
import Clipboard from './components/Clipboard';
import URLRedirection from './components/URLRedirection';
import ClipboardViewer from './components/ClipboardViewer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<URLShortener />} />
        <Route path="/shortener" element={<URLShortener />} />
        <Route path="/links-list" element={<LinksList />} />
        <Route path="/clipboard" element={<Clipboard />} />
        {/* <Route path='*' element={< Clipboard/>} /> */}
        <Route path="/:short" component={<URLRedirection/>} />
        <Route path="/clipboard/:clipboard_short_url" element={<ClipboardViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
