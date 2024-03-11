import React, { useState } from 'react';
import './Record.css';
import Journal from '../../components/Journal/Journal';

function Record() {
  const [isChecked, setChecked] = useState(false);
  const [journals, setJournals] = useState([]);

  const toggleSwitch = () => {
    setChecked(!isChecked);
  };

  const addJournals = () => {// 사진추가
    setJournals(prevJournals => [...prevJournals, {}]);
  };

  return (
    <div className="split-screen">
      <div className="left-pane"> 
        <div className="text-input-box">
          <input
            type="text"
            placeholder="여행에 알맞는 제목을 입력해주세요..."
            // value={inputValue}
            // onChange={handleChange}
          />
        </div>
        <div className={`toggle-switch ${isChecked ? 'checked' : ''}`} onClick={toggleSwitch}>
          <p className="share">공유</p>
          <input type="checkbox" checked={isChecked} readOnly />
          <span className="slider"></span>
        </div>
        <div/>
        {journals.map((journal, index) => (
          <Journal key={index} />
        ))}
        <button className="add-journal" onClick={addJournals}>+</button>
      </div>
      <div className="right-pane"> {/* 오른쪽 30% */}
        <div className="emty"/>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
      </div>
    </div>
  );
}

export default Record;
