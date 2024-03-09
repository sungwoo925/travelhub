import React from 'react';
import Cube from '../../components/Cube/Cube';
import './Home.css';

function Home() {
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
    </div>
  );
}

export default Home;
