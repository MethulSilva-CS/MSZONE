import React, { useEffect, useState } from 'react';
import './PlayerTV.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import netflix_spinner from '../../assets/netflix_spinner.gif';
import { useNavigate, useParams } from 'react-router-dom';

function PlayerTv() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [tvShow, setTvShow] = useState(null);
  const [imdbId, setImdbId] = useState(null);
  const [error, setError] = useState('');

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTA2MmYyMGQ1MDQ2MDFkNjY4NjRkZWNiMDViNTYzZCIsIm5iZiI6MTc1MjA2NDcyMS42MTksInN1YiI6IjY4NmU2MmQxODFiNDY2NzUzNjU0MGEwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BW4I89qGV2j0hkfl7BzOwq6DZtYcZjE1ddElof8G45I',
    },
  };

  useEffect(() => {
    // Fetch trailer
    fetch(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`, options)
      .then((res) => res.json())
      .then((res) => {
        const trailer = res.results?.find((v) => v.type === 'Trailer' || v.type === 'Teaser');
        setVideo(trailer || null);
      })
      .catch(() => setError('Failed to fetch video.'));

    // Fetch TV show details
    fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options)
      .then((res) => res.json())
      .then((data) => setTvShow(data))
      .catch(() => setError('Failed to fetch TV show info.'));

    // Fetch IMDb ID via external_ids
    fetch(`https://api.themoviedb.org/3/tv/${id}/external_ids`, options)
      .then((res) => res.json())
      .then((data) => setImdbId(data.imdb_id))
      .catch(() => setImdbId(null));
  }, [id]);

  return (
    <div className='tv-player'>
      <img
        src={back_arrow_icon}
        alt='Back'
        onClick={() => navigate(-1)}
        className='tv-back-arrow'
      />

      <div className='tv-player-container'>
        {video ? (
          <div className='tv-video'>
            <iframe
              src={`https://www.youtube.com/embed/${video.key}`}
              title='Trailer'
              frameBorder='0'
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className='tv-error-message'>
            {error ? <p>{error}</p> : <img src={netflix_spinner} alt='Loading...' className='loading-spinner' />}
          </div>
        )}

        {tvShow && (
          <div className='tv-details'>
            <h1>{tvShow.name}</h1>
            <p><strong>{tvShow.first_air_date?.slice(0, 4)}</strong></p>
            <p><strong>{tvShow.genres?.map((g) => g.name).join(' / ')}</strong></p>
            <p><strong className='overview'>Overview: </strong>{tvShow.overview}</p>
            <p><strong className='votes'>❤️ {tvShow.vote_count}</strong></p>

            {imdbId && tvShow.vote_average && (
              <p>
                <a
                  href={`https://www.imdb.com/title/${imdbId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="imdb-link"
                >
                  <strong className="imdb-rate">IMDb: {tvShow.vote_average.toFixed(1)} / 10</strong>
                </a>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PlayerTv;
