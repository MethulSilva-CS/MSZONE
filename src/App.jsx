import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';

import { auth } from './firebase';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Player from './Pages/Player/Player';
import PlayerTv from './Pages/PlayerTV/PlayerTv'; // ✅ Import PlayerTv
import TVSeries from './Pages/TVSeries/TvSeries';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('Logged In');
        navigate('/');
      } else {
        console.log('Logged Out');
        navigate('/login');
      }
    });
  }, []);

  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />          
        <Route path='/tvplayer/:id' element={<PlayerTv />} />     
        <Route path='/tvSeries' element={<TVSeries />} />
      </Routes>
    </div>
  );
};

export default App;
