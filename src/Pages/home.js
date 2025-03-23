import React from 'react';
import Header from '../components/Header/Header';
import AboutUs from '../components/Aboutus/Aboutus';
import FitnessGoalsComponent from '../components/Opportunite/Opportunite';
import Avis from '../components/Avis/Avis';
import Inscription from '../components/inscription/inscription';
import Footer from '../components/Footer/Footer';
import Screenshot from '../components/Screenshots/Screenshots';

function Home() {
  return (
    <div className="App">
    <Header />
    <AboutUs />
    <FitnessGoalsComponent />
    <Screenshot/>
    <Avis />
    <Inscription />
    <Footer/>
    </div>
  )
}

export default Home;