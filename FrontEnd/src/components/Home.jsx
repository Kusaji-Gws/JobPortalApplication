import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection';
import CategoryCorousel from './CategoryCorousel';

const Home = () => {
  return (
    <>
   <Navbar/>
   <HeroSection/>
   <CategoryCorousel/>
   </>
  )
}

export default Home;