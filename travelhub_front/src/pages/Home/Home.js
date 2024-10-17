import React, { useState, useEffect } from "react";
import Cube from "../../components/Cube/Cube";
import "./Home.css";
import axios from "axios";

function Home() {
  const [data, setData] = useState([]); // 초기 데이터 배열을 빈 배열로 설정
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [viewMode, setViewMode] = useState("grid"); // 기본값을 'grid' 로 설정
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("최신순"); // 정렬 옵션
  const [myTravelOnly, setMyTravelOnly] = useState(false); // 나의 여행 필터


  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:9826/travels");
      console.log(response.data); // 데이터 구조 확인
      setData(response.data.map(item => ({
        ...item,
        likeCount: item.likeCount || item.like_count || 0 // likeCount가 없으면 like_count 사용
      })));
    } catch (error) {
      setError(error);
      console.log(error);
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

  const toggleLike = async (travelId) =>  {
    try {
        console.log(travelId);
        const response = await axios.post("http://localhost:9826/likes", {
            userId: 16,
            travelId: travelId, 
        });

        setData((prevData) =>
          prevData.map((item) =>
            item.travel_id === travelId
              ? { ...item, likeCount: (item.likeCount || 0) + 1 } // 좋아요 수 증가
              : item
          )
        );
        fetchData(); // 좋아요 후 데이터 새로고침
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
              <button onClick={() => toggleLike(item)}>좋아요</button>
              <span>{item.likeCount < 0 ? 0 : item.likeCount}</span>
              <Cube />
              <button className="edit-button">수정</button>
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
              <button onClick={() => toggleLike(item.travel_id)}>좋아요</button> {/* 좋아요 버튼 추가 */}
              <span>{item.likeCount >= 0 ? item.likeCount : ''}</span> {/* 좋아요 수가 0 이상일 때만 표시 */}
              <Cube />
              <button className="edit-button">수정</button>
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
