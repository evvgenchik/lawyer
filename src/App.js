import { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header.jsx';
import Hero from './components/Hero_new.jsx';
import Stats from './components/Stats.jsx';
import Reviews from './components/Reviews.jsx';
import Services from './components/Services.jsx';

// Lazy load heavy components
const FAQ = lazy(() => import('./components/FAQ.jsx'));
const ConsultationForm = lazy(() => import('./components/ConsultationForm.jsx'));
const YandexMap = lazy(() => import('./components/YandexMap.jsx'));
const Footer = lazy(() => import('./components/Footer.jsx'));
// const ChatWidget = lazy(() => import('./components/ChatWidget.jsx'));
const AdminLogin = lazy(() => import('./admin/AdminLogin.jsx'));
const AdminDashboard = lazy(() => import('./admin/AdminDashboard.jsx'));
const ProtectedRoute = lazy(() => import('./admin/ProtectedRoute.jsx'));

// Loading component
const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
);

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
                            <Reviews />
                            <Services />
                            
                            <Suspense fallback={<LoadingSpinner />}>
                                <FAQ />
                                <ConsultationForm />
                                <YandexMap />
                                <Footer />
                                {/* <ChatWidget /> */}
                            </Suspense>
                        </>
                    } />

                    {/* Admin Routes */}
                    <Route path="/admin" element={
                        <Suspense fallback={<LoadingSpinner />}>
                                <AdminLogin />
                        </Suspense>
                    } />
                    <Route 
                        path="/admin/dashboard" 
                        element={
                            <Suspense fallback={<LoadingSpinner />}>
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
