import React from 'react'
import GNB from '../components/GlobalNavigationBar';
import './Home.css'; // CSS 파일 추가
import RecentStudy from '../components/home/RecentStudy';

function Home() {
  return (
    <div className="home-container">
      <GNB /> 
      <RecentStudy />
    </div>
  )
}

export default Home
