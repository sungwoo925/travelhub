import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css'; // 전역 스타일 파일
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Record from './pages/Record/Record';
import Studio from './studio/Studio';

function App() {
  console.log("hi");
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<div><Header /><Home /><Footer /></div>} />
          <Route path="/about" element={<div><Header /><About /><Footer /></div>} />
          <Route path="/record" element={<div><Header /><Record /><Footer /></div>} />
          <Route path="/login" element={<div><Header /><Login /><Footer /></div>} />
          <Route path="/register" element={<div><Header /><Register /><Footer /></div>} />
          <Route path="/studio" element={<Studio/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
