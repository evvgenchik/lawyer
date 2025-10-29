import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header.jsx';
import Hero from './components/Hero_new.jsx';
// import Services from './components/Services.jsx';
import Stats from './components/Stats.jsx';
import Testimonials from './components/Testimonials.jsx';
import Team from './components/Team.jsx';
import FAQ from './components/FAQ.jsx';
import ConsultationForm from './components/ConsultationForm.jsx';
import Footer from './components/Footer.jsx';

const ChatWidget = lazy(() => import('./components/ChatWidget.jsx'));
const AdminLogin = lazy(() => import('./admin/AdminLogin.jsx'));
const AdminDashboard = lazy(() => import('./admin/AdminDashboard.jsx'));
const ProtectedRoute = lazy(() => import('./admin/ProtectedRoute.jsx'));

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={
                        <>
                            <Header />
                            <Hero />
                            <Stats />
                            {/* <Services /> */}
                            <Testimonials />
                            <Team />
                            <FAQ />
                            <ConsultationForm />
                            <Footer />

                            <Suspense>
                                <ChatWidget />
                            </Suspense>
                        </>
                    } />

                    {/* Admin Routes */}
                    <Route path="/admin" element={
                        <Suspense fallback={<div className='flex items-center justify-center'>Загружается</div>}>
                                <AdminLogin />
                        </Suspense>
                    } />
                    <Route 
                        path="/admin/dashboard" 
                        element={
                            <Suspense fallback={<div className='flex items-center justify-center'>Загружается</div>}>
                                <ProtectedRoute>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            </Suspense>
                        } 
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
