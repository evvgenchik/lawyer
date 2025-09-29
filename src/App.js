import React from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import Stats from './components/Stats.jsx';
import Team from './components/Team.jsx';
import ConsultationForm from './components/ConsultationForm.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Stats />
      <Services />
      <Team />
      <ConsultationForm />
      <Footer />
    </div>
  );
}

export default App;