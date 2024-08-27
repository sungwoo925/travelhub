import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; // AuthContext 가져오기
import './Mypage.css';

const Mypage = () => {
    const { userInfo, logout } = useContext(AuthContext); // 사용자 정보와 로그아웃 함수 가져오기

    // useEffect(() => {
    //     const userId = 14; // 실제 사용자 ID
    //     axios.get(`http://localhost:9826/api/users/${userId}`)
    //         .then(response => {
    //             setUserData(response.data);
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             setUserData(data);  
    //             setLoading(false);
    //         })
    //         .catch(error => {
    //             setError(error);
    //             setLoading(false);
    //         });
    // }, []);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }


    return (
        <div className="mypage-container">
            <h1 className="mypage-title">마이페이지</h1>
            <p className="mypage-description">여기에 사용자 정보를 표시합니다.</p>
            {userInfo ? ( // userInfo가 있을 경우에만 표시
                <ul className="mypage-info-list">
                    <li className="mypage-info-item">프로필 이미지: <img src={userInfo.profile_image} alt="Profile" /></li>
                    <li className="mypage-info-item">이름: {userInfo.profile_nickname}</li>
                    <li className="mypage-info-item">이메일: {userInfo.email}</li>
                    <li className="mypage-info-item">성별: {userInfo.gender}</li>
                </ul>
            ) : (
                <p>사용자 정보가 없습니다.</p>
            )}
        </div>
    );
};


export default Mypage;