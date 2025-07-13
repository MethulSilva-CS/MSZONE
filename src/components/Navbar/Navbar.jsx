import React, { useEffect, useRef } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import profile_img from '../../assets/profile_img.jpg'
import caret_icon from '../../assets/caret_icon.svg'
import { logout } from '../../firebase'
import { Link } from 'react-router-dom'
function Navbar () {
    const navRef = useRef();
    useEffect(()=>{
        window.addEventListener('scroll',()=>{
            if(window.scrollY >= 80){
                navRef.current.classList.add('nav-dark')
            }else{
                navRef.current.classList.remove('nav-dark')
            }
        })
    },[])
  return (
    <div  ref={navRef} className='navbar'>
       <div className="navbar-left">
            <img  className='logo' src={logo} alt=""/>
            <ul>
                <li><Link to='/'>Movies</Link></li>
                <li><Link to='/tvSeries'>TV shows</Link></li>
            </ul>
       </div>
       <div className="navbar-right">        
         <div className="navbar-profile">
            <img src={profile_img} alt=""  className='profile'/>
            <img src={caret_icon} alt="" />
            <div className="dropdown">
                <p onClick={()=>{logout()}}>Sign Out of MSZONE</p>
            </div>
         </div>
       </div>
    </div>
  )
}

export default Navbar
