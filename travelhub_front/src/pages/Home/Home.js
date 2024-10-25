import React, { useState, useEffect } from "react";
import Cube from "../../components/Cube/Cube";
import "./Home.css";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

function Home() {
  const [originalData, setOriginalData] = useState([]); // 원본 데이터를 저장할 상태 추가
  const [data, setData] = useState([]); // 초기 데이터 배열을 빈 배열로 설정
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [viewMode, setViewMode] = useState("grid"); // 기본값을 'grid' 로 설정
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [sortOption, setSortOption] = useState("최신순"); // 정렬 옵션
  const [myTravelOnly, setMyTravelOnly] = useState(false); // 나의 여행 필터
  const [userId, setUserId] = useState(null); // userId 상태 추가

  const jwtToken = Cookies.get("jwtToken");

  const fetchData = async () => {
    try {
      if(jwtToken){
        const userIdres = await axios.post(
          "http://" + apiUrl + ":9826/auth/checkToken",
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
            token: `token000111222${jwtToken}token000111222`,
          }
        );
        const userId = userIdres.data.split("Token is valid. User ID: ")[1];
        setUserId(userId); // userId 상태 업데이트
      }else{
        setUserId(null); // userId 상태 업데이트
      }

      const response = await axios.get("http://" + apiUrl + ":9826/travels");
      const realdata = response.data;
      setOriginalData(realdata);

      realdata.map(async(data,index)=>{
        const journals = await axios.get("http://" + apiUrl + ":9826/journals/travel/"+data.travelId);
        realdata[index].links = journals.data.map((data)=> data.photo_link.replace(/\\/g, '/').replace("./static","http://" + apiUrl + ":9826")); 
        if(journals.data.length===0){
          realdata[index].links = [];
        }
      });

      const likesInfo = (userId? (await axios.get("http://" + apiUrl + ":9826/likes/user/"+userId)): -1);
      // eslint-disable-next-line
      realdata.map((data,index)=>{
        realdata[index].Ilike = likesInfo.data.includes(data.travelId);
        realdata[index].userId_real = userId;
      });
      setData(realdata);
      console.log(realdata);
      

    } catch (error) {
      // setError(error);
      // console.log(error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (myTravelOnly && userId) {
      const filteredData = originalData.filter(item => String(userId) === String(item.user_id.userId));
      setData(filteredData);
    } else {
      setData(originalData);
    }
  }, [myTravelOnly, userId, originalData]);

  const handleSortChange = (option) => {
    // setSortOption(option);
  };

  const toggleMyTravel = () => {
    setMyTravelOnly(!myTravelOnly);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // 날짜 형식을 변환하는 함수 추가
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.split("T")[0]; // T 이전의 날짜 부분만 반환
  };

  const toggleLike  = async (travelId,index) => {
    const userIdres = await axios.post(
      "http://" + apiUrl + ":9826/auth/checkToken",
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        token: `token000111222${jwtToken}token000111222`,
      }
    );
    const userId = userIdres.data.split("Token is valid. User ID: ")[1];
    // console.log(travelId)
    try {
        const response = await axios.post("http://" + apiUrl + ":9826/likes", {
            userId: userId,
            travelId: travelId
        });
        console.log(response);
        
        setData(prevDatas => {
            const updatedDatas = [...prevDatas]; // 기존 배열 복사
            updatedDatas[index].like_count = response.data.like_count; // 특정 인덱스의 값 수정
            updatedDatas[index].Ilike = !updatedDatas[index].Ilike; 
            return updatedDatas; // 수정된 배열 반환
        });
    } catch (error) {
        console.error("Error toggling like:", error);
    }
  };

  const unLike  = async (travelId,index) => {
    const userIdres = await axios.post(
      "http://" + apiUrl + ":9826/auth/checkToken",
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        token: `token000111222${jwtToken}token000111222`,
      }
    );
    const userId = userIdres.data.split("Token is valid. User ID: ")[1];
    // console.log(travelId)
    try {
        const response = await axios.post("http://" + apiUrl + ":9826/likes/delete", {
            userId: userId,
            travelId: travelId
        });
        console.log(response);
        
        setData(prevDatas => {
            const updatedDatas = [...prevDatas]; // 기존 배열 복사
            updatedDatas[index].like_count = response.data.like_count; // 특정 인덱스의 값 수정
            updatedDatas[index].Ilike = !updatedDatas[index].Ilike; 
            return updatedDatas; // 수정된 배열 반환
        });
    } catch (error) {
        console.error("Error toggling like:", error);
    }
  };

  return (
    <div className="container home-container">
      <div className="sort-options">
        <button onClick={() => handleSortChange("최신순")}>최신순</button>
        <button onClick={() => handleSortChange("조회순")}>조회순</button>
        <button onClick={() => handleSortChange("좋아요순")}>좋아요순</button>
        <div className="toggle-container">
          <div className="toggle-label">나의 여행만 보기</div>
          <input type="checkbox" id="toggle" hidden checked={myTravelOnly} onChange={toggleMyTravel}/>
          <label htmlFor="toggle" className="toggleSwitch">
            <span className="toggleButton"></span>
          </label>
        </div>
        <button
          className="view-toggle"
          onClick={() => setViewMode(viewMode === "slide" ? "grid" : "slide")}
        >
          {viewMode === "slide" ? "그리드 보기" : "슬라이드 보기"}
        </button>
      </div>
      {viewMode === "slide" ? (
        <div className="slide-view">
          {currentItems.map((item, index) => (
            <div key={index} className="list-item">
              <span className="item-number">
                {index + 1 + indexOfFirstItem}.{" "}
                {item.travel_title || "제목 없음"}
              </span>
              <div className="item-title">
                {item.travel_title || "제목 없음"}
              </div>
              <div className="travel-dates">
                {item.travel_start_date && item.travel_end_date
                  ? `${formatDate(item.travel_start_date)} ~ ${formatDate(
                      item.travel_end_date
                    )}`
                  : "날짜 정보 없음"}
              </div>
              <div className="travel-summary">{item.summary}</div>
              {item.Ilike ? 
              <button onClick={() => unLike(item.travelId,index)}>좋아요</button>:
              <button onClick={() => toggleLike(item.travelId,index)}>좋아요</button>}
              <div>{item.like_count}</div>
              <Cube travel={item} />
              <Link to={"/record/"+item.travelId}>
              {parseInt(item.userId_real)===item.user_id.userId? <button className="edit-button">수정</button>:""}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid-view">
          {currentItems.map((item, index) => (
            <div key={index} className="cube-container">
              <div className="card">
                <Cube travel={item} />
                <h2 className="title">{item.travel_title || "제목 없음"}</h2>
                <p className="travel-period">{item.travel_start_date && item.travel_end_date ? `${formatDate(item.travel_start_date)} ~ ${formatDate(item.travel_end_date)}`: "날짜 정보 없음"}</p>
                <div className="like-section">
                    {userId?(item.Ilike ? 
                  <button className="unlike-button" onClick={() => unLike(item.travelId,index)}>❤️ 좋아요</button>:
                  <button className="like-button" onClick={() => toggleLike(item.travelId,index)}>❤️ 좋아요</button>):<div>좋아요 수 :   </div>}
                  <span className="like-count">{item.like_count}</span>
                </div>
              <Link to={"/record/"+item.travelId}>
              {parseInt(item.userId_real)===item.user_id.userId? <button className="edit-button">수정</button>:""}
              </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="button-container">
        <button onClick={fetchData}>test</button>
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i + 1} onClick={() => handlePageChange(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;
