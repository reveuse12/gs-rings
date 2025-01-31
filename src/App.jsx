import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MyTransactions from './pages/MyTransactions';
import JewelViewer2 from './pages/ijewelviewer';
import JewelViewer3 from './pages/ijewelviewer2';
import JewelViewer4 from './pages/ijewelviewer3';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-transactions" element={<MyTransactions />} />
        <Route path="/viewer" element={<JewelViewer2 />} />
        <Route path="/viewer2" element={<JewelViewer3 />} />
        <Route path="/viewer3" element={<JewelViewer4 />} />
      </Routes>
    </Router>
  );
}

export default App;
