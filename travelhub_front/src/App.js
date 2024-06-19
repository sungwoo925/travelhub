import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Record from './pages/Record/Record';
import Studio from './studio/Studio';
import Mypage from './pages/Mypage/Mypage';
import './App.css';
import Background from './components/Background/Background';
import Cookies from 'js-cookie';
import axios from 'axios';

function App() {
  const jwtToken = Cookies.get('jwtToken');
  const { login } = useContext(AuthContext);

  if (jwtToken) {
    axios.post('http://localhost:9826/auth/checkToken', {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    .then(response => {
      console.log(response.data);
      login(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  } else {
    // JWT token does not exist, user is not logged in
    // Redirect to login page or perform logout actions
  }
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
          <Route path="/mypage" element={<div className="app">
                                          <Header />
                                          <Mypage />
                                          <Footer />
                                        </div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

