import React, { useState } from 'react';
import './TVSeries.css';
import Navbar from '../../components/Navbar/Navbar';
import hero_banner_tv from "../../assets/hero_banner_tv.jpg";
import hero_title_tv from '../../assets/hero_title_tv.png';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCardsTV from '../../components/TitleCardsTv/TitleCardsTv';
import Footer from '../../components/Footer/Footer';
import search_icon from '../../assets/search_icon.svg'
import { useNavigate } from 'react-router-dom';

function TVSeries() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
   const handlePlayClick = () => {
    const featuredMovieId = 1396;
    navigate(`/tvplayer/${featuredMovieId}`); 
  };

  return (
    <div className='tvseries'>
      <Navbar />

      <div className='tvseries-hero'>
        <img src={hero_banner_tv} alt="" className='tvseries-banner-img' />
        <div className='tvseries-hero-caption'>
          <img src={hero_title_tv} alt="" className='tvseries-caption-img' />
          <p>
            Guided by desperation, a brilliant teacher enters a hidden world of crime, risking everything to protect his family and transform his fate through the deadly art of chemistry.
          </p>
          <div className='tvseries-hero-btns'>
            <button className='tvseries-btn' onClick={handlePlayClick}><img src={play_icon} alt="" />Play</button>
            <button className='tvseries-btn dark-btn' onClick={handlePlayClick}><img src={info_icon} alt="" />More Info</button>
          </div>

         
          <div className="tvseries-search-bar">
            <input
              type="text"
              placeholder="Search TV Series..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img src={search_icon} alt=""  className='tv-icons'/>
          </div>

          
          {searchTerm ? (
            <TitleCardsTV title={`Search Results for "${searchTerm}"`} searchTerm={searchTerm} />
          ) : (
            <TitleCardsTV title="Trending Now" category="airing_today" />
          )}
        </div>
      </div>

      
      {!searchTerm && (
        <div className="tvseries-more-cards">
          <TitleCardsTV title={"Currently Airing"} category={"airing_today"} />
          <TitleCardsTV title={"On the Air"} category={"on_the_air"} />
          <TitleCardsTV title={"Popular Series"} category={"popular"} />
          <TitleCardsTV title={"Top Rated Shows"} category={"top_rated"} />
        </div>
      )}

      <Footer />
    </div>
  );
}

export default TVSeries;
