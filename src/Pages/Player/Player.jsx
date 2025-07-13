import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';
import netflix_spinner from '../../assets/netflix_spinner.gif'
function Player() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [movie, setMovie] = useState(null);
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
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then((res) => res.json())
      .then((res) => {
        const trailer = res.results?.find(
          (v) => v.type === 'Trailer' || v.type === 'Teaser'
        );
        setVideo(trailer || null);
      })
      .catch(() => setError('Failed to fetch video.'));

    // Fetch Movie Info
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch(() => setError('Failed to fetch movie info.'));
  }, [id]);

  return (
    <div className='player'>
      <img
        src={back_arrow_icon}
        alt='Back'
        onClick={() => navigate(-1)}
        className='back-arrow'
      />

      <div className='player-container'>
        {video ? (
          <div className='movie-video'>
            <iframe
              src={`https://www.youtube.com/embed/${video.key}`}
              title='Trailer'
              frameBorder='0'
              allowFullScreen
            ></iframe>
            
          </div>
        ) : (
         <div className='error-message'>
           {error ? (<p>{error}</p>) : (<img src={netflix_spinner} alt="Loading..." className="loading-spinner" />)}
          </div>

        )}

        {movie && (
          <div className='movie-details'>
            <h1>{movie.title}</h1>
            <p><strong>{movie.release_date?.slice(0, 4)}</strong> </p>
            <p><strong>{movie.genres?.map(g => g.name).join(' / ')}</strong> </p>
            <p><strong className='overview'>Overview: </strong> {movie.overview}</p>
            <p><strong className='votes'>❤️{movie.vote_count}</strong></p>
            {movie.imdb_id && movie.vote_average && (<p>
              <a
                  href={`https://www.imdb.com/title/${movie.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="imdb-link"><strong className="imdb-rate">IMDb: {movie.vote_average.toFixed(1)} / 10</strong>
                  </a>
             </p>
           )}
         </div>
        )}
      </div>
    </div>
  );
}

export default Player;
