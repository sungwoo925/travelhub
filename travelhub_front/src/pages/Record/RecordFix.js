import React, {  useEffect, useState, useRef } from "react";
import "./Record.css";
// import Journal from "../../components/Journal/Journal";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

function RecordFix() {
  const { travelId } = useParams();

  const [isChecked, setChecked] = useState(true);
  // const [journals, setJournals] = useState([]);
  const [images, setImages] = useState([]);
  const [recordData, setRecordData] = useState({
    travelId: 0,
    userId: 0,
    title: "",
    location: "",
    date: "",
    weather: "",
    text: ""
  });
  const [hashtags, setHashtags] = useState([
    "#해시태그1",
    "#해시태그2",
    "#해시태그3",
  ]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);
  const [newHashtag, setNewHashtag] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const dragItem = useRef(); // 드래그할 아이템의 인덱스
  const dragOverItem = useRef(); // 드랍할 위치의 아이템의 인덱스
  const [draggingIndex, setDraggingIndex] = useState(null); // 드래그 중인 아이템의 인덱스
  const [gridItems, setGridItems] = useState([]); // 그리드 아이템 상태 추가
  const [swapIndex1, setSwapIndex1] = useState(""); // 첫 번째 교환 인덱스 상태
  const [swapIndex2, setSwapIndex2] = useState(""); // 두 번째 교환 인덱스 상태

  const jwtToken = Cookies.get("jwtToken");

  useEffect(() => {
    startRecord();
    // console.log(isAuthenticated);
    if (jwtToken) {
    } else {
      alert("로그인 후 이용 가능합니다."); // 알림 메시지 추가
      window.location.href = "/login";
    }
    // eslint-disable-next-line
  }, []);

  const startRecord = async () => {
    console.log("Record Start");
    const jwtToken = Cookies.get("jwtToken");
    const userIdres = await axios.post(
      apiUrl+"/auth/checkToken",
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        token: `token000111222${jwtToken}token000111222`,
      }
    );
    const userId = userIdres.data.split("Token is valid. User ID: ")[1];
    console.log(travelId);
    const travel = await axios.post(apiUrl+"/travels/"+travelId,{
        token: `token000111222${jwtToken}token000111222`
    });
    if(travel.data.travelId===0){
      alert("감히 공격을 시도해~~??? 뒤져"); // 알림 메시지 추가
      window.location.href = "/";
    }
    setRecordData({ travelId: travelId,
      userId: userId,
      title: travel.data.travel_title,
      location: travel.data.travel_location_name + " latitude:"+
      travel.data.travel_location_latitude+" longitude:"+
      travel.data.travel_location_longitude,
      date: travel.data.travel_start_date,
      weather: travel.data.weather,
      text: travel.data.travel_text
    });

    const journals = await axios.get(apiUrl+"/journals/travel/"+travelId);

    let images = [];
    journals.data.forEach(function(image){
      images.push({
        src : apiUrl+"/"+image.photo_link.replace(/\\/g, '/').split("ic/")[1],
        image_id : image.journalId,
        journal_date : image.journal_date,
        journal_text : image.journal_text,
        journal_location_name : image.journal_location_name,
        journal_location_latitude : image.journal_location_latitude,
        journal_location_longitude : image.journal_location_longitude,
        weather : image.weather,
      });
    });
    setImages(images);
  };

  const deleteImage = async (journalId) => {
    const deletedImage = await axios.delete(apiUrl+"/journals/"+journalId);
    console.log(deletedImage)
    if(deletedImage.data === "success"){
      return true;
    }
    return false;
  }
  const setSelected = (locationInfo) => {
    setRecordData({ ...recordData, location: locationInfo });
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSearch = async () => {
    // Handle search functionality here
    console.log("Searching for:", searchQuery);
    try {
      const response = await axios.get(
        apiUrl+"/maps/" + searchQuery
      );
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      // setError(error);
      console.log(error);
    } finally {
      // setLoading(false);
      // console.log(data);
    }
  };

  const addHashtag = () => {
    if (newHashtag.trim() !== "" && !hashtags.includes(`#${newHashtag}`)) {
      // 중복 체크 추가
      setHashtags([...hashtags, `#${newHashtag}`]); // 해시태그 앞에 # 추가
      setNewHashtag("");
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

  // const addJournals = () => {
  //   setJournals((prevJournals) => [...prevJournals, {}]);
  // };

  const savetravel = () => {
    if (recordData.location === "") {
      alert("location정보 미입력");
      return "location err";
    }
    
    const location = recordData.location.split(" latitude:");
    const locationName = location[0];
    const locationInfo = location[1].split(" longitude:");
  
    // 여행 정보 업데이트 요청
    const travelRequest = axios.put(apiUrl + "/travels/" + recordData.travelId, {
      user_id: recordData.userId,
      travel_title: recordData.title,
      hashtag: hashtags.join(),
      travel_start_date: startDate + "T00:00:00",
      travel_end_date: endDate + "T00:00:00",
      travel_share_option: isChecked,
      travel_location_name: locationName,
      travel_location_latitude: locationInfo[0],
      travel_location_longitude: locationInfo[1],
      travel_text: recordData.text,
      like_count: 0,
      view_count: 0,
      summary: "",
    });
  
    // 이미지 정보 업데이트 요청들
    const journalRequests = images.map((image, index) =>
      axios.put(apiUrl + "/journals/" + image.image_id, {
        journal_date: image.journal_date,
        journal_text: image.journal_text,
        journal_location_name: image.journal_location_name,
        journal_location_latitude: image.journal_location_latitude,
        journal_location_longitude: image.journal_location_longitude,
        weather: image.weather,
        sequence_info: index,
      })
    );
  
    // 모든 요청 완료 후 홈으로 이동
    axios
      .all([travelRequest, ...journalRequests])
      .then(() => {
        window.location.href = "/"; // 홈으로 이동
      })
      .catch((error) => {
        console.error("저장 실패:", error);
        alert("저장 중 오류가 발생했습니다.");
      });
  };

  function compressImage(file, quality = 0.7) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;

            img.onload = () => {
                // Create canvas element
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                // Set canvas size to image size
                canvas.width = img.width;
                canvas.height = img.height;

                // Draw image on canvas
                ctx.drawImage(img, 0, 0);

                // Convert canvas to blob with specified quality
                canvas.toBlob((blob) => {
                    resolve(blob);
                }, 'image/jpeg', quality);
            };

            img.onerror = (err) => {
                reject(err);
            };
        };

        reader.onerror = (err) => {
            reject(err);
        };

        reader.readAsDataURL(file); // Read the file as data URL
    });
}

const handleImageChange = (e) => {
  const files = Array.from(e.target.files);
  if (images.length + files.length > 14) {
    // 최대 14개 체크
    const confirmAddMore = window.confirm(
      "최대 14개의 이미지만 추가할 수 있습니다. 추가하시겠습니까?"
    ); // 확인 대화상자 추가
    if (!confirmAddMore) {
      return; // 추가하지 않으면 종료
    }
  }
  const newImages = []; // 새로운 이미지 배열 초기화

  files.forEach((file) => {
    const reader = new FileReader();
    reader.onloadend = async() => {
      let imageData = {
        src: reader.result,
        journal_location_name: "",
        journal_date: "",
        weather: "",
        journal_text: "",
        image_id: 0,
      };
      newImages.push(imageData); // 새로운 이미지 배열에 추가

       // 이미지 압축
      const compressedBlob = await compressImage(file);

      const formData = new FormData();

      // FormData 생성
      formData.append("file", compressedBlob, file.name); 

      axios
          .post(
            apiUrl+"/journals/uploadImage/" +
              recordData.travelId +
              "/" +
              recordData.userId,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${jwtToken}`,
              },
            }
          )
          .then((response) => {
            // console.log("Server response:", response.data.split(" "));
            setHashtags((prevHashtags) => [
              ...prevHashtags,
              ...response.data.split(" ").slice(1),
            ]);
            // 이미지를 상태에 추가 (성공 시)
            if (newImages.length === files.length) {
              imageData.image_id = parseInt(response.data.split(" ")[0], 10);
              setImages((oldImages) => {
                const updatedImages = [...oldImages, imageData]; // 기존 이미지와 새 이미지를 합침
                const updatedGridItems = Array.from(
                  { length: updatedImages.length },
                  (_, index) => (
                    <div
                      key={index}
                      className={`grid-item ${
                        index < updatedImages.length ? "yellow" : ""
                      }`}
                    >
                      {index + 1} {/* 번호 매기기 */}
                    </div>
                  )
                );
                setGridItems(updatedGridItems); // gridItems 상태 업데이트
                return updatedImages; // 상태 업데이트
              });
            }
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
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
    setGridItems(
      newImages.map(
        (
          _,
          index // 그리드 아이템 업데이트
        ) => (
          <div
            key={index}
            className={`grid-item ${index < newImages.length ? "yellow" : ""}`}
          >
            {index + 1} {/* 번호 매기기 */}
          </div>
        )
      )
    ); // 그리드 아이템 업데이트
    setDraggingIndex(null); // 드래그 종료 시 인덱스 초기화
  };

  const swapImages = () => {
    console.log(gridItems);
    console.log(images);
    const index1 = parseInt(swapIndex1) - 1;
    const index2 = parseInt(swapIndex2) - 1;
    if (
      index1 >= 0 &&
      index2 >= 0 &&
      index1 < images.length &&
      index2 < images.length
    ) {
      const newImages = [...images];
      [newImages[index1], newImages[index2]] = [
        newImages[index2],
        newImages[index1],
      ]; // 이미지 교환
      setImages(newImages);
      setGridItems(
        newImages.map((_, index) => (
          <div
            key={index}
            className={`grid-item ${index < newImages.length ? "yellow" : ""}`}
          >
            {index + 1} {/* 번호 매기기 */}
          </div>
        ))
      );
      setSwapIndex1(""); // 입력 필드 초기화
      setSwapIndex2(""); // 입력 필드 초기화
    } else {
      alert("번호에 해당하는 사진이 없습니다!"); // 유효성 검사
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#f4f4f8",
      }}
    >
      <div className="left-pane">
        <div className="empty" />
        <div className="text-input-container">
          <div className="text-input-box">
            <input
              type="text"
              placeholder="여행에 알맞는 제목을 입력해주세요!"
              value={recordData.title}
              onChange={(e) =>
                setRecordData({ ...recordData, title: e.target.value })
              }
            />
          </div>
          <label htmlFor="file-upload" className="custom-file-input">
            +
          </label>
          <div
            className={`toggle-switch ${isChecked ? "checked" : ""}`}
            onClick={toggleSwitch}
          >
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
            <span
              key={index}
              className="record-hashtag"
              onClick={() => removeHashtag(index)}
            >
              {tag}
            </span>
          ))}
          {showInput && (
            <>
              <input
                type="text"
                value={newHashtag}
                onChange={(e) => setNewHashtag(e.target.value)}
                className="record-hashtag-input"
                placeholder="새로운 해시태그 입력"
              />
              <button onClick={addHashtag}>추가</button>
            </>
          )}
          {!showInput && (
            <span
              className="record-add-hashtag-button"
              onClick={() => setShowInput(true)}
            >
              #해시태그 추가
            </span>
          )}
        </div>
        <div className="record_title_card">
          <div className="record-inputs">
            <div className="record-text-input-box">
              <input
                type="text"
                className="styled-input"
                placeholder="내용을 입력해주세요!"
                value={recordData.text}
                onChange={(e) =>
                  setRecordData({ ...recordData, text: e.target.value })
                }
              />
            </div>
            <button onClick={openModal}>
              {recordData.location === ""
                ? "장소 찾기"
                : recordData.location.split(" latitude")[0]}
            </button>
            <div className="date-inputs">
              <input
                type="date"
                className="styled-date"
                value={startDate}
                onChange={handleStartDateChange}
              />
              <span className="date-separator"> ~ </span>
              <input
                type="date"
                className="styled-date"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </div>
            {showModal && (
              <div className="modal-content">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="modal-input"
                  placeholder="장소를 검색하세요"
                />
                <button onClick={handleSearch} className="modal-button">
                  검색
                </button>
                <button onClick={closeModal} className="modal-button">
                  닫기
                </button>
                <div className="record-locations-container">
                  {data &&
                    data.slice(0, 10).map((data, index) => (
                      <div
                        key={data.name}
                        className="record-locations"
                        onClick={() =>
                          setSelected(
                            data.name +
                              " latitude:" +
                              data.latitude +
                              " longitude:" +
                              data.longitude
                          )
                        }
                      >
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
                className={`image-detail-box ${
                  draggingIndex === index ? "faded" : ""
                }`} // 드래그 중인 아이템만 희미해지도록 설정
                draggable
                onDragStart={(e) => dragStart(e, index)}
                onDragEnter={(e) => dragEnter(e, index)}
                onDragEnd={drop}
                onDrop={drop}
              >
                <button
                  className="remove-image-button"
                  onClick={() => {
                    const deletes = deleteImage(image.image_id);
                    if(deletes){
                      const updatedImages = images.filter((_, i) => i !== index); // 이미지 삭제
                      setImages(updatedImages);
                      setGridItems(
                        updatedImages.map(
                          (
                            _,
                            idx // 그리드 아이템 업데이트
                          ) => (
                            <div
                              key={idx}
                              className={`grid-item ${
                                idx < updatedImages.length ? "yellow" : ""
                              }`}
                            >
                              {idx + 1} {/* 번호 매기기 */}
                            </div>
                          )
                        )
                      );
                    }
                  }}
                >
                  &times; {/* 삭제 아이콘 */}
                </button>
                <div className="image-number">{index + 1}</div>{" "}
                {/* 이미지 번호 추가 */}
                <img src={image.src} alt={`Uploaded ${index}`} />
                <div className="weather-selection">
                  <div
                    className={`weather-box ${
                      image.weather === "맑음" ? "selected" : ""
                    }`}
                    onClick={() => handleWeatherChange(index, "맑음")}
                  >
                    <img src="./images/sunny.png" alt="맑음" />
                  </div>
                  <div
                    className={`weather-box ${
                      image.weather === "흐림" ? "selected" : ""
                    }`}
                    onClick={() => handleWeatherChange(index, "흐림")}
                  >
                    <img src="./images/cloudy.png" alt="흐림" />
                  </div>
                  <div
                    className={`weather-box ${
                      image.weather === "비" ? "selected" : ""
                    }`}
                    onClick={() => handleWeatherChange(index, "비")}
                  >
                    <img src="./images/rainy.png" alt="비" />
                  </div>
                  <div
                    className={`weather-box ${
                      image.weather === "눈" ? "selected" : ""
                    }`}
                    onClick={() => handleWeatherChange(index, "눈")}
                  >
                    <img src="./images/snowy.png" alt="눈" />
                  </div>
                </div>
                <input
                  type="text"
                  value={image.journal_location_name}
                  onChange={(e) =>
                    handleDetailChange(
                      index,
                      "journal_location_name",
                      e.target.value
                    )
                  }
                  placeholder="장소를 입력하세요!"
                />
                <input
                  type="date"
                  value={image.journal_date}
                  onChange={(e) =>
                    handleDetailChange(index, "journal_date", e.target.value)
                  }
                  placeholder="날짜를 입력하세요!"
                />
                <textarea
                  value={image.journal_text}
                  onChange={(e) =>
                    handleDetailChange(index, "journal_text", e.target.value)
                  }
                  placeholder="메모"
                />
              </div>
            ))}
          </div>
        </div>
        {/* <button className="add-journal" onClick={addJournals}>+</button> */}
      </div>
      <div className="right-pane">
        <div className="grid-container">
          {gridItems} {/* gridItems를 렌더링 */}
        </div>
        <div className="swap-container">
          <input
            type="number"
            value={swapIndex1}
            onChange={(e) => {
              const value = Math.max(1, Math.min(14, e.target.value)); // 1~14 범위로 제한
              setSwapIndex1(value);
            }}
            placeholder="ex) 5"
            className="swap-input"
          />
          <input
            type="number"
            value={swapIndex2}
            onChange={(e) => {
              const value = Math.max(1, Math.min(14, e.target.value)); // 1~14 범위로 제한
              setSwapIndex2(value);
            }}
            placeholder="ex) 12"
            className="swap-input"
          />
          <button onClick={swapImages}>바꾸기</button>
        </div>
        <button className="save" onClick={savetravel}>
          저장하기
        </button>
      </div>
    </div>
  );
}

export default RecordFix;
