import React, { useState } from 'react';
import Cube from '../../components/Cube/Cube';
import './Home.css';
import axios from 'axios';

function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:9826/maps/타임슬라이스');
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
      console.log(data);
    }
  };

  return (
    <div className="home-container">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="cube-container">
          <Cube />
        </div>
      ))}
      <div className="button-container">
        <button onClick={fetchData}>test</button>
      </div>
    </div>
  );
}

export default Home;
