import React, { useState } from 'react';
import './Record.css';
import Journal from '../../components/Journal/Journal';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';

function Record() {
  const [isChecked, setChecked] = useState(false);
  const [journals, setJournals] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);

  const toggleSwitch = () => {
    setChecked(!isChecked);
  };

  const addJournals = () => {
    setJournals(prevJournals => [...prevJournals, {}]);
  };

  const savetravel = () => {
    console.log("save");
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const readers = [];

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(oldImages => [...oldImages, {
          src: reader.result,
          place: '',
          date: '',
          weather: '',
          notes: ''
        }]);
      };
      readers.push(reader);
      reader.readAsDataURL(file);
    });
  };

  const handleDetailChange = (index, field, value) => {
    const newImages = [...images];
    newImages[index][field] = value;
    setImages(newImages);
  };

  return (
    <div className="split-screen">
      <div className="left-pane">
        <div className='empty'/>
        <div className="text-input-box">
          <input type="text" placeholder="여행에 알맞는 제목을 입력해주세요..." />
        </div>
        <div className={`toggle-switch ${isChecked ? 'checked' : ''}`} onClick={toggleSwitch}>
          <p className="share">공유</p>
          <input type="checkbox" checked={isChecked} readOnly />
          <span className="slider"></span>
        </div>
        <input type="file" onChange={handleImageChange} className="file-input" multiple />
        <div className="image-upload-section">
          {images.map((image, index) => (
            <div key={index} className="image-detail-box">
              <img src={image.src} alt={`Uploaded ${index}`} />
              <input 
                type="text" 
                value={image.place} 
                onChange={(e) => handleDetailChange(index, 'place', e.target.value)} 
                placeholder="Place"
              />
              <input 
                type="text" 
                value={image.date} 
                onChange={(e) => handleDetailChange(index, 'date', e.target.value)} 
                placeholder="Date"
              />
              <input 
                type="text" 
                value={image.weather} 
                onChange={(e) => handleDetailChange(index, 'weather', e.target.value)} 
                placeholder="Weather"
              />
              <textarea 
                value={image.notes} 
                onChange={(e) => handleDetailChange(index, 'notes', e.target.value)} 
                placeholder="Notes"
              />
            </div>
          ))}
        </div>
        {journals.map((journal, index) => (
          <Journal key={index} />
        ))}
        <button className="add-journal" onClick={addJournals}>+</button>
        <Footer />
      </div>
      <div className="right-pane">
        <div className="empty"/>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <button className="save" onClick={savetravel}>save</button>
      </div>
    </div>
  );
}

export default Record;
