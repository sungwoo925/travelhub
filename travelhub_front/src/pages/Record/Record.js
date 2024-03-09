import React from 'react';
import './Record.css';

function Record() {
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
