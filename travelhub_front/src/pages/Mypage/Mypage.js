import React, {  useEffect, useState } from 'react';
import axios from 'axios'; // axios 추가
import Cookies from 'js-cookie'; // 쿠키 사용을 위한 js-cookie 추가
import './Mypage.css';
const apiUrl = process.env.REACT_APP_API_URL;

const Mypage = () => {
    const [userData, setUserData] = useState(null); // 사용자 데이터 상태 추가
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [error, setError] = useState(null); // 에러 상태 추가

    useEffect(() => {
        const fetchUserData = async () => {
            const jwtToken = Cookies.get('jwtToken'); // 쿠키에서 JWT 토큰 가져오기
            if (jwtToken) { 
                try {
                    const userIdres = await axios.post(
                    "http://"+apiUrl+":9826/auth/checkToken",
                    {
                        headers: {
                        Authorization: `Bearer ${jwtToken}`,
                        },
                        token: `token000111222${jwtToken}token000111222`,
                    }
                    );
                    const userId = userIdres.data.split("Token is valid. User ID: ")[1];
                    const response = await axios.get(`http://${apiUrl}:9826/api/users/${userId}`);
                    setUserData(response.data);
                } catch (error) {
                    console.error("API 요청 에러:", error); // 에러 메시지 출력
                    setError(error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false); 
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    
    const formatPhoneNumber = (phoneNumber) => {
        if (!phoneNumber) return '정보 없음'; // 전화번호가 없을 경우 처리
        const cleaned = phoneNumber.replace(/\D/g, ''); // 숫자만 남기기
        const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/); // 010, 0000, 0000 형식으로 매칭
        if (match) {
            return `${match[1]}-${match[2]}-${match[3]}`; // 포맷팅된 전화번호 반환
        }
        return phoneNumber; // 포맷팅 실패 시 원래 전화번호 반환
    };
    
    return (
        <div className="mypage-container">
            <h1 className="mypage-title">마이페이지</h1>
            {error && <p>오류가 발생했습니다: {error.message}</p>} {/* 에러 메시지 표시 */}
            {userData ? ( // userData가 있을 경우에만 표시
                <ul className="mypage-info-list">
                    <li className="mypage-info-item">이름: {userData.user_name}</li> {/* user_name 표시 */}
                    <li className="mypage-info-item">이메일: {userData.user_email}</li> {/* user_email 표시 */}
                    <li className="mypage-info-item">전화번호: {formatPhoneNumber(userData.user_phone_num)}</li> {/* 전화번호 포맷팅 */}
                    <li className="mypage-info-item">생일: {userData.birthday}</li> {/* birthday 표시 */}
                    <li className="mypage-info-item">성별: {userData.sex === 'M' ? '남자' : userData.sex === 'F' ? '여자' : '정보 없음'}</li> {/* 성별 표시 */}
                    </ul>
            ) : (
                <p>사용자 정보가 없습니다.</p>
            )}
        </div>
    );
};

export default Mypage;
