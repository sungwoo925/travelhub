import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Record from './pages/Record/Record';
import Studio from './studio/Studio';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<div><Header /><div className='empty'/><Home /><Footer /></div>} />
          <Route path="/about" element={<div><Header /><div className='empty'/><About /><Footer /></div>} />
          <Route path="/record" element={<div><Header /><Record /></div>} />
          <Route path="/login" element={<div><Header /><div className='empty'/><Login /><Footer /></div>} />
          <Route path="/register" element={<div><Header /><div className='empty'/><Register /><Footer /></div>} />
          <Route path="/studio" element={<Studio/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
