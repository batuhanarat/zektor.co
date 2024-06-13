// src/pages/landing/LandingPage.tsx

import { useNavigate } from 'react-router-dom';
import Header from '../../components/landing-components/header/Header';
import Hero from '../../components/landing-components/hero/Hero';
import Info from '../../components/landing-components/info/Info';
import Banner from '../../components/landing-components/banner/Banner';
import "./../../scss/main.scss";
const LandingPage = () => {
  const navigate = useNavigate();


 const handleLogin = () => {
    // Simulate authentication by setting a flag in localStorage
    localStorage.setItem('isAuthenticated', 'true');
    // Redirect to the dashboard
    navigate('/dashboard');
  };


  return (
    <div>
        <Header/>
        <button onClick={handleLogin} >Dashboard</button>
        <Hero/>
        <Info/>
        <Banner/>



    </div>
  );
};

export default LandingPage;
