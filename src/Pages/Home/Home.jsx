import React, { useState } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import hero_banner from "../../assets/hero_banner.jpg";
import hero_title from '../../assets/hero_title.png';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';
import search_icon from '../../assets/search_icon.svg';
import { useNavigate } from 'react-router-dom'; 

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handlePlayClick = () => {
    const featuredMovieId = 1011477;
    navigate(`/player/${featuredMovieId}`); 
  };

  return (
    <div className='home'>
      <Navbar />
      <div className='hero'>
        <img src={hero_banner} alt="" className='banner-img' />
        <div className='hero-caption'>
          <img src={hero_title} alt="" className='caption-img' />
          <p>
            Training under legendary masters, a determined teen uncovers a secret legacy and battles rising darkness to defend his home and honor the ancient spirit of martial arts.
          </p>
          <div className='hero-btns'>
            <button className='btn' onClick={handlePlayClick}>
              <img src={play_icon} alt="" />Play
            </button>
            <button className='btn dark-btn' onClick={handlePlayClick}><img src={info_icon} alt="" />More Info</button>
          </div>

          <div className="home-search-bar">
            <input
              type="text"
              placeholder="Search Movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img src={search_icon} alt="" className='icons' />
          </div>

          <TitleCards
            title={searchTerm ? `Search Results for "${searchTerm}"` : "Trending Now"}
            category={searchTerm ? null : "now_playing"}
            searchTerm={searchTerm}
          />
        </div>
      </div>

      {!searchTerm && (
        <div className="more-cards">
          <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
          <TitleCards title={"Only on MSZONE"} category={"popular"} />
          <TitleCards title={"Upcoming"} category={"upcoming"} />
          <TitleCards title={"Top Picks for You"} category={"now_playing"} />
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Home;
