import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import Stats from './components/Stats.jsx';
import Testimonials from './components/Testimonials.jsx';
import Team from './components/Team.jsx';
import FAQ from './components/FAQ.jsx';
import ConsultationForm from './components/ConsultationForm.jsx';
import Footer from './components/Footer.jsx';
import ChatWidget from './components/ChatWidget.jsx';

function App() {
    return (
        <div className="App">
            <Header />
            <Hero />
            <Stats />
            <Services />
            <Testimonials />
            <Team />
            <FAQ />
            <ConsultationForm />
            <Footer />
            <ChatWidget />
        </div>
    );
}

export default App;
