import React, { useEffect, useState } from 'react';
import './TitleCardsTV.css';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

function TitleCardsTV({ title, category, searchTerm }) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTA2MmYyMGQ1MDQ2MDFkNjY4NjRkZWNiMDViNTYzZCIsIm5iZiI6MTc1MjA2NDcyMS42MTksInN1YiI6IjY4NmU2MmQxODFiNDY2NzUzNjU0MGEwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BW4I89qGV2j0hkfl7BzOwq6DZtYcZjE1ddElof8G45I'
    }
  };

  const [apiData, setApiData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setApiData([]);
    setPage(1);
    setHasMore(true);
    fetchData(1);
  }, [category, searchTerm]);

  const fetchData = async (pageNumber) => {
    let url = '';

    if (searchTerm) {
      url = `https://api.themoviedb.org/3/search/tv?query=${searchTerm}&language=en-US&page=${pageNumber}`;
    } else {
      url = `https://api.themoviedb.org/3/tv/${category ? category : "airing_today"}?language=en-US&page=${pageNumber}`;
    }

    try {
      const res = await fetch(url, options);
      const data = await res.json();

      if (data.results && data.results.length > 0) {
        setApiData((prev) => [...prev, ...data.results]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
      setHasMore(false);
    }
  };

  return (
    <div className='tv-title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>

      <InfiniteScroll
        dataLength={apiData.length}
        next={() => fetchData(page)}
        hasMore={hasMore}
        endMessage={<p style={{ textAlign: 'center', color: '#aaa' }}>No more results</p>}
      >
        <div className='tv-card-list'>
          {apiData.length > 0 ? (
            apiData.map((card, index) => (
             <Link to={`/tvplayer/${card.id}`} className="tv-card" key={index}>
                {card.backdrop_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                    alt={card.original_name || card.name}
                  />
                ) : (
                  <div className="tv-no-image">No Image</div>
                )}
                <p>{card.original_name || card.name}</p>
              </Link>
            ))
          ) : (
            <p style={{ padding: '20px', color: '#aaa' }}>No results found.</p>
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default TitleCardsTV;
