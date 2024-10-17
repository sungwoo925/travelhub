import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext'; // AuthContext 가져오기
import axios from 'axios'; // axios 추가
import Cookies from 'js-cookie'; // 쿠키 사용을 위한 js-cookie 추가
import './Mypage.css';

const Mypage = () => {
    const { userInfo } = useContext(AuthContext); // userInfo 가져오기
    const [userData, setUserData] = useState(null); // 사용자 데이터 상태 추가
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [error, setError] = useState(null); // 에러 상태 추가

    useEffect(() => {
        const fetchUserData = async () => {
            const jwtToken = Cookies.get('jwtToken'); // 쿠키에서 JWT 토큰 가져오기
            console.log("JWT Token:", jwtToken); // JWT 토큰 확인
            console.log("userInfo:", userInfo); // userInfo 확인
            if (userInfo && userInfo.userId) { // userInfo와 userId가 존재하는지 확인
                try {
                    const response = await axios.get(`http://localhost:9826/api/users/${userInfo.userId}`, {
                        headers: {
                            Authorization: `Bearer ${jwtToken}` // JWT 토큰을 헤더에 추가
                        }
                    });
                    console.log("API 응답:", response.data); // API 응답 확인
                    setUserData(response.data);
                } catch (error) {
                    console.error("API 요청 에러:", error); // 에러 메시지 출력
                    setError(error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false); // userInfo가 없으면 로딩 종료
            }
        };

        fetchUserData();
    }, [userInfo]); // userInfo가 변경될 때마다 실행

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mypage-container">
            <h1 className="mypage-title">마이페이지</h1>
            {error && <p>오류가 발생했습니다: {error.message}</p>} {/* 에러 메시지 표시 */}
            {userData ? ( // userData가 있을 경우에만 표시
                <ul className="mypage-info-list">
                    <li className="mypage-info-item">이름: {userData.user_name}</li> {/* user_name 표시 */}
                    <li className="mypage-info-item">이메일: {userData.user_email}</li> {/* user_email 표시 */}
                    <li className="mypage-info-item">전화번호: {userData.user_phone_num}</li> {/* user_phone_num 표시 */}
                    <li className="mypage-info-item">생일: {userData.birthday}</li> {/* birthday 표시 */}
                    <li className="mypage-info-item">성별: {userData.sex}</li> {/* sex 표시 */}
                </ul>
            ) : (
                <p>사용자 정보가 없습니다.</p>
            )}
        </div>
    );
};

export default Mypage;
