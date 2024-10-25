import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Record from "./pages/Record/Record";
import Studio from "./studio/Studio";
import Mypage from "./pages/Mypage/Mypage";
import "./App.css";
import Cookies from "js-cookie";
import axios from "axios";
import RecordFix from "./pages/Record/RecordFix";
const apiUrl = process.env.REACT_APP_API_URL;

function App() {
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    if (jwtToken) {
      axios
        .post("http://"+apiUrl+"/auth/checkToken", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          token: `token000111222${jwtToken}token000111222`,
        })
        .then((response) => {
          login(response.data);
        })
        .catch((error) => {
          login(false);
        });
    }
  });

  return (
    <Router>
      <div>
        <Routes>
        <Route
            path="/"
            element={
              <div className="app">
                <Header />
                <Home />
                <Footer />
              </div>
            }
          />
          <Route
            path="/about"
            element={
              <div className="app">
                <Header />
                <div className="About-page-swiper">
                  <About />
                </div>
                <div className="About-page-swiper-footer-degine">
                  <Footer />
                </div>
              </div>
            }
          />
          <Route
            path="/record"
            element={
              <div className="app">
                <Header />
                <Record />
                <Footer />
              </div>
            }
          />
          <Route
            path="/record/:travelId"
            element={
              <div className="app">
                <Header />
                <RecordFix />
                <Footer />
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <div className="app">
                <Header />
                <div className="Login-main-content">
                  <div className="main-content">
                    <Login />
                  </div>
                </div>
                <Footer className="footer" />
              </div>
            }
          />
          <Route
            path="/register"
            element={
              <div className="app">
                <Header />

                <div className="register-main-content">
                  <div className="re-main-content">
                    <Register />
                  </div>
                </div>
                <Footer />
              </div>
            }
          />
          <Route path="/studio" element={<Studio />} />
          <Route path="/studio/:travelId" element={<Studio />} />
          <Route
            path="/mypage"
            element={
              <div className="app">
                <Header />
                <Mypage />
                <Footer />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
