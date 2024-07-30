import React, { useEffect, useState, useRef } from 'react';
import './Record.css';
import Journal from '../../components/Journal/Journal';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import Cookies from 'js-cookie';

function Record() {
  const [isChecked, setChecked] = useState(false);
  const [journals, setJournals] = useState([]);
  const [images, setImages] = useState([]);
  const [recordData, setRecordData] = useState({
    title: '',
    location: '',
    date: '',
    weather: '',
    text: ''
  });
  const [hashtags, setHashtags] = useState(['#해시태그1', '#해시태그2', '#해시태그3']);
  const [newHashtag, setNewHashtag] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dragItem = useRef(); // 드래그할 아이템의 인덱스
  const dragOverItem = useRef(); // 드랍할 위치의 아이템의 인덱스
  const [draggingIndex, setDraggingIndex] = useState(null); // 드래그 중인 아이템의 인덱스


  useEffect(() => {
    const token = Cookies.get('jwtToken');
    console.log(token);
    if (!token) {
      alert('로그인 후 이용 가능합니다.'); // 알림 메시지 추가
      window.location.href = '/login';
    }
  }, []);

  const setSelected = ( locationInfo ) => {
    setRecordData({ ...recordData, location: locationInfo });
    setShowModal(false);
  }

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSearch = async () => {
    // Handle search functionality here
    console.log('Searching for:', searchQuery);
    try {
      const response = await axios.get('http://localhost:9826/maps/' + searchQuery);
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

  const addHashtag = () => {
    if (newHashtag.trim() !== '' && !hashtags.includes(`#${newHashtag}`)) { // 중복 체크 추가
        setHashtags([...hashtags, `#${newHashtag}`]); // 해시태그 앞에 # 추가
        setNewHashtag('');
        setShowInput(false); // 해시태그 추가 후 입력 칸 숨김
    }
  };

  const removeHashtag = (index) => {
      const updatedHashtags = [...hashtags];
      updatedHashtags.splice(index, 1);
      setHashtags(updatedHashtags);
  };

  const toggleSwitch = () => {
    setChecked(!isChecked);
  };

  const addJournals = () => {
    setJournals(prevJournals => [...prevJournals, {}]);
  };

  const savetravel = () => {
    
    // const payload = {
    //   images: images.map(image => ({
    //     src: image.src,
    //     journal_location_name: image.journal_location_name,
    //     journal_date: image.journal_date,
    //     weather: image.weather,
    //     journal_text: image.journal_text
    //   })),
    //   journals: journals.map(journal => ({
    //     title: journal.title,
    //     content: journal.content,
    //     date: journal.date
    //   }))
    // };

    // console.log("Images:", JSON.stringify(payload.images, null, 2)); // 이미지 데이터 확인
    // // console.log("Journals:", JSON.stringify(payload.journals, null, 2)); // 일지 데이터 확인

    // console.log(payload);
    // axios.post(`http://localhost:9826/travels`, payload, {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(response => { 
    //   console.log('저장 성공:', response.data);
    // })  
    // .catch(error => {
    //   console.error('저장 실패:', error);
    //   if (error.response) {
    //     console.error('에러 응답 데이터:', error.response.data); // 에러 응답 데이터 확인
    //   }
    // });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const readers = [];

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = {
          src: reader.result,
          journal_location_name: '',
          journal_date: '',
          weather: '',
          journal_text: ''
        };
        setImages(oldImages => [...oldImages, imageData]);//앞으로 땡겨옴
        // FormData 객체 생성
        const formData = new FormData();
        formData.append('file', file);  // file 필드에 파일 추가
        formData.append('data', JSON.stringify(imageData));  // 추가 데이터를 JSON 문자열로 변환하여 추가
    
        // 백엔드로 파일 전송
        axios.post('http://localhost:9826/journals/uploadImage', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          console.log('Server response:', response.data.split(" "));
          setHashtags((prevHashtags) => [...prevHashtags, ...response.data.split(" ").slice(1)]);
          // 이미지를 상태에 추가 (성공 시)
          
        })
        .catch(error => {
          console.error('Error uploading file:', error);
        });
      };
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

  const dragStart = (e, position) => {
    dragItem.current = position;
    setDraggingIndex(position); // 드래그 중인 아이템의 인덱스 설정
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const drop = (e) => {
    const newImages = [...images];
    const dragItemValue = newImages[dragItem.current];
    newImages.splice(dragItem.current, 1);
    newImages.splice(dragOverItem.current, 0, dragItemValue);
    dragItem.current = null;
    dragOverItem.current = null;
    setImages(newImages);
    setDraggingIndex(null); // 드래그 종료 시 인덱스 초기화
  };

  return (
    <div className="split-screen">
      <div className="left-pane">
        <div className='empty'/>
        <div className="text-input-container">
          <div className="text-input-box">
            <input 
              type="text" 
              placeholder="여행에 알맞는 제목을 입력해주세요!" 
              value={recordData.title}
              onChange={(e) => setRecordData({ ...recordData, title: e.target.value })}
            />
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
        <div className="record-hashtag-container">
            {hashtags.map((tag, index) => (
                <span key={index} className="record-hashtag" onClick={() => removeHashtag(index)}>
                    {tag}
                </span>
            ))}
            {showInput && (
                <>
                    <input type="text" value={newHashtag} onChange={(e) => setNewHashtag(e.target.value)} className="record-hashtag-input" placeholder="새로운 해시태그 입력" />
                    <button onClick={addHashtag}>추가</button>
                </>
            )}
            {!showInput && (
                <span className="record-add-hashtag-button" onClick={() => setShowInput(true)}>#해시태그 추가</span>
            )}
        </div>
        <div className='record-inputs'>
          <div className="record-text-input-box">
            <input 
              type="text" 
              className="styled-input"
              placeholder="내용을 입력해주세요!" 
              value={recordData.text}
              onChange={(e) => setRecordData({ ...recordData, text: e.target.value })}
            />
          </div>
          <button onClick={openModal}>{recordData.location === '' ? "장소 찾기" : recordData.location.split(' latitude')[0] }</button>
          {showModal && (
                  <div className="modal-content">
                      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="modal-input" placeholder="장소를 검색하세요" />
                      <button onClick={handleSearch} className="modal-button">검색</button>
                      <button onClick={closeModal} className="modal-button">닫기</button>
                      <div className="record-locations-container">
                          {data && data.slice(0, 10).map((data, index) => (
                              <div key={data.name} className="record-locations" onClick={() => setSelected(data.name + " latitude:" + data.latitude + " longitude:" +  data.longitude)}>
                                  {data.name}
                              </div>
                          ))}
                      </div>
                  </div>
          )}
        </div>
        <div className="image-upload-section">
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`image-detail-box ${draggingIndex === index ? 'faded' : ''}`} // 드래그 중인 아이템만 희미해지도록 설정
            draggable 
            onDragStart={(e) => dragStart(e, index)} 
            onDragEnter={(e) => dragEnter(e, index)} 
            onDragEnd={drop} 
            onDrop={drop}
          >
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
              value={image.journal_location_name} 
              onChange={(e) => handleDetailChange(index, 'journal_location_name', e.target.value)} 
              placeholder="장소를 입력하세요!"
            />
            <input 
              type="date" 
              value={image.journal_date} 
              onChange={(e) => handleDetailChange(index, 'journal_date', e.target.value)} 
              placeholder="날짜를 입력하세요!"
            />
            <textarea 
              value={image.journal_text} 
              onChange={(e) => handleDetailChange(index, 'journal_text', e.target.value)} 
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
        <div className="grid-container">
          <div className="grid-item">1</div>
          <div className="grid-item">2</div>
          <div className="grid-item">3</div>
          <div className="grid-item">4</div>
          <div className="grid-item">5</div>
          <div className="grid-item">6</div>
          <div className="grid-item">7</div>
          <div className="grid-item">8</div>
          <div className="grid-item">9</div>
          <div className="grid-item">10,11</div>
          <div className="grid-item">12</div>
          <div className="grid-item">13,14</div>
        </div>
        <button className="save" onClick={savetravel}>저장하기</button>
      </div>
    </div>
  );
}

export default Record;