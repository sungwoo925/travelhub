import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Header.css';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(['1','2']);

  const handleSearch = async () => {
      try {
          const response = await axios.get(`http://localhost:9826/api/users/${searchTerm}`);
          console.log(response.data);
          setSearchResults(response.data);
      } catch (error) {
          console.error('Error fetching search results:', error);
      }
      console.log(searchResults);
  };

  return (
    <div className="navbar">
      <Link to="/">이웃스토리</Link>
      <Link to="/about">이용방법</Link>
      <Link to="/record">기록하기</Link>
      <input 
          type="text" 
          value={searchTerm} 
          className='search'
          style={{width:'20%',marginTop:'8px'}}
          onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <button onClick={handleSearch}>Search</button>
      {/* <ul>
          {searchResults.map(user => (
              <li >{user}</li>
          ))}
      </ul> */}
      <Link to="/login" className='login'>로그인</Link>
      <Link to="/register" className='register'>회원가입</Link>
    </div>
  );
};

export default Header;