import React, { useState, useEffect } from "react";
import Cube from "../../components/Cube/Cube";
import "./Home.css";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]); // 초기 데이터 배열을 빈 배열로 설정
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [viewMode, setViewMode] = useState("grid"); // 기본값을 'grid' 로 설정
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("최신순"); // 정렬 옵션
  const [myTravelOnly, setMyTravelOnly] = useState(false); // 나의 여행 필터

  const jwtToken = Cookies.get("jwtToken");

  const fetchData = async () => {
    try {
      const userIdres = await axios.post(
        "http://localhost:9826/auth/checkToken",
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          token: `token000111222${jwtToken}token000111222`,
        }
      );
      const userId = userIdres.data.split("Token is valid. User ID: ")[1];
      const response = await axios.get("http://localhost:9826/travels");
      const realdata = response.data;
      realdata.map(async(data,index)=>{
        const journals = await axios.get("http://localhost:9826/journals/travel/"+data.travelId);
        realdata[index].links = journals.data.map((data)=> data.photo_link.replace(/\\/g, '/').replace("./travelhub_back/src/main/resources/static","http://localhost:9826")); 
        if(journals.data.length===0){
          realdata[index].links = [];
        }
      });
      const likesInfo = await axios.get("http://localhost:9826/likes/user/"+userId);      
      realdata.map((data,index)=>{
        realdata[index].Ilike = likesInfo.data.includes(data.travelId);
        realdata[index].userId_real = userId;

      });
      setData(realdata);
      console.log(realdata);
      

    } catch (error) {
      setError(error);
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSortChange = (option) => {
    setSortOption(option);
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
      "http://localhost:9826/auth/checkToken",
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
        const response = await axios.post("http://localhost:9826/likes", {
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
      "http://localhost:9826/auth/checkToken",
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
        const response = await axios.post("http://localhost:9826/likes/delete", {
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
        <div>
          <span>나의 여행만 보기</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={myTravelOnly}
              onChange={toggleMyTravel}
            />
            <span className="slider"></span>
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
              <button onClick={() => unLike(item.travelId,index)}>좋아요취소</button>:
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
              <span>
                {index + 1 + indexOfFirstItem}.{" "}
                {item.travel_title || "제목 없음"}
              </span>
              <div className="travel-dates">
                {item.travel_start_date && item.travel_end_date
                  ? `${formatDate(item.travel_start_date)} ~ ${formatDate(
                      item.travel_end_date
                    )}`
                  : "날짜 정보 없음"}
              </div>
              {item.Ilike ? 
              <button onClick={() => unLike(item.travelId,index)}>좋아요취소</button>:
              <button onClick={() => toggleLike(item.travelId,index)}>좋아요</button>}              
              <span>{item.like_count}</span> {/* 좋아요 수가 0 이상일 때만 표시 */}
              <Cube travel={item} />
              <Link to={"/record/"+item.travelId}>
              {parseInt(item.userId_real)===item.user_id.userId? <button className="edit-button">수정</button>:""}
              </Link>
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
