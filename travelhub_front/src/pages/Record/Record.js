import React, { useState } from 'react';
import './Record.css';
import Journal from '../../components/Journal/Journal';
import Footer from '../../components/Footer/Footer';

function Record() {
  const [isChecked, setChecked] = useState(false);
  const [journals, setJournals] = useState([]);
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

  const handleWeatherChange = (index, weather) => {
    const newImages = [...images];
    newImages[index].weather = weather;
    setImages(newImages);
  };

  return (
    <div className="split-screen">
      <div className="left-pane">
        <div className='empty'/>
        <div className="text-input-container">
          <div className="text-input-box">
            <input type="text" placeholder="여행에 알맞는 제목을 입력해주세요!" />
          </div>
          <label htmlFor="file-upload" className="custom-file-input">+</label>
          <div className={`toggle-switch ${isChecked ? 'checked' : ''}`} onClick={toggleSwitch}>
            <p className="share">공유</p>
            <span className="slider"></span>
          </div>
        </div>
        <input 
          type="file" 
          onChange={handleImageChange} 
          className="file-input" 
          multiple 
          id="file-upload"
        />        
        <div className="image-upload-section">
        {images.map((image, index) => (
          <div key={index} className="image-detail-box">
            <div className="image-number">{index + 1}</div> {/* 이미지 번호 추가 */}
            <img src={image.src} alt={`Uploaded ${index}`} />
            <div className="weather-selection">
              <div 
                className={`weather-box ${image.weather === '맑음' ? 'selected' : ''}`}
                onClick={() => handleWeatherChange(index, '맑음')}
              >
                <img src="./images/sunny.png" alt="맑음" />
              </div>
              <div 
                className={`weather-box ${image.weather === '흐림' ? 'selected' : ''}`}
                onClick={() => handleWeatherChange(index, '흐림')}
              >
                <img src="./images/cloudy.png" alt="흐림" />
              </div>
              <div 
                className={`weather-box ${image.weather === '비' ? 'selected' : ''}`}
                onClick={() => handleWeatherChange(index, '비')}
              >
                <img src="./images/rainy.png" alt="비" />
              </div>
              <div 
                className={`weather-box ${image.weather === '눈' ? 'selected' : ''}`}
                onClick={() => handleWeatherChange(index, '눈')}
              >
                <img src="./images/snowy.png" alt="눈" />
              </div>
            </div>
            <input 
              type="text" 
              value={image.place} 
              onChange={(e) => handleDetailChange(index, 'place', e.target.value)} 
              placeholder="장소를 입력하세요!"
            />
            <input 
              type="text" 
              value={image.date} 
              onChange={(e) => handleDetailChange(index, 'date', e.target.value)} 
              placeholder="날짜를 입력하세요!"
            />
            <textarea 
              value={image.notes} 
              onChange={(e) => handleDetailChange(index, 'notes', e.target.value)} 
              placeholder="메모"
            />
          </div>
        ))}
      </div>
        {journals.map((journal, index) => (
          <Journal key={index} />
        ))}
        {/* <button className="add-journal" onClick={addJournals}>+</button> */}
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
