import React, { useEffect, useState } from 'react';
import './Mypage.css';

const Mypage = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = 13; // 실제 사용자 ID
        fetch(`localhost:9826/api/users/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUserData(data);  
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="mypage-container">
            <h1 className="mypage-title">마이페이지</h1>
            <p className="mypage-description">여기에 사용자 정보를 표시합니다.</p>
            {userData && (
                <ul className="mypage-info-list">
                    <li className="mypage-info-item">이름: {userData.user_name}</li>
                    <li className="mypage-info-item">이메일: {userData.user_email}</li>
                    <li className="mypage-info-item">전화번호: {userData.user_phone_num}</li>
                    <li className="mypage-info-item">생일: {userData.birthday}</li>
                    <li className="mypage-info-item">성별: {userData.sex}</li>
                    <li className="mypage-info-item">가입일: {userData.registrationDate}</li>
                </ul>
            )}
        </div>
    );
};

export default Mypage;
