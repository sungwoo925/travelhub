import React, { useState } from 'react';
import Cube from '../../components/Cube/Cube';
import './Home.css';
import axios from 'axios';

function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {//api 호출 예시
    try {
      const response = await axios.get('http://172.17.153.88:9826/json');
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      console.log(data);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='Cube'>
        <Cube/>
      </div>
      <div>
        <Cube />
      </div>
      <Cube />
      <Cube />
      <Cube />
      <Cube />
      <button onClick={fetchData}>test</button>
    </div>
  );
}

export default Home;
