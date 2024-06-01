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
import Background from './components/Background/Background';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<div className="app">
                                      <Header />
                                      <Home />
                                      <Footer />
                                  </div>} />
          <Route path="/about" element={<div className="app">
                                          <Header />
                                          <div className='empty'/>
                                          <About />
                                          <Footer />
                                        </div>} />
          <Route path="/record" element={<div className="app">
                                          <Header />
                                          <Record />
                                        </div>} />
          <Route path="/login" element={<div className="app">
                                          <Header />
                                          <div className='empty'/>
                                          <Login />
                                          <Footer />
                                          <Background/>
                                        </div>} />
          <Route path="/register" element={<div className="app">
                                              <Header />
                                              <div className='empty'/>
                                              <Register />
                                              <Footer />
                                              <Background/>
                                          </div>} />
          <Route path="/studio" element={<Studio/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
