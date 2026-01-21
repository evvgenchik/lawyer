import { useState, useEffect, useRef } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Add smooth scrolling behavior
    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
        document.documentElement.style.scrollPaddingTop = '5rem'; 

        return () => {
            document.documentElement.style.scrollBehavior = 'auto';
            document.documentElement.style.scrollPaddingTop = '0'; 
        };
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    // Close mobile menu when link is clicked
    const handleNavClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-custom-blue shadow-lg sticky top-0 z-50" ref={menuRef}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
                <div className="flex justify-between items-center py-2 sm:py-2">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center gap-1">
                            <img 
                                src="/images/logo.png" 
                                alt="Кодекс Logo" 
                                className="h-16 sm:h-20 lg:h-32 w-auto"
                            />
                            <h1 className="text-2xl sm:text-6xl font-bold" 
                                style={{ 
                                    fontFamily: '"Cormorant Unicase", "Georgia", serif',
                                    color: 'rgb(2 39 57 / var(--tw-bg-opacity))',
                                    WebkitTextStroke: '5px #ffffff',
                                    paintOrder: 'stroke fill'
                                }}
                            >
                                Кодекс
                            </h1>
                        </div>
                    </div>

                    <div className="hidden xl:block">
                        <div className="ml-4 flex items-baseline space-x-2">
                            <a href="#consultation" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-lg font-medium">
                                Консультация
                            </a>
                            <a href="#services" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-lg font-medium">
                                Услуги
                            </a>
                            <a href="#faq" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-lg font-medium">
                                Вопросы
                            </a>
                            <a href="#contacts" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-lg font-medium">
                                Контакты
                            </a>
                        </div>
                    </div>

                    <div className="hidden xl:block">
                        <div className="ml-2 flex items-center md:ml-6">
                            <a href="tel:+79290123848" className="text-white hover:text-gray-200 font-semibold text-sm">
                                +7 (929) 012-38-48
                            </a>
                            <a
                                href="https://t.me/kodex_kvo"
                                className="ml-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Telegram
                            </a>
                        </div>
                    </div>

                    <div className="xl:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="bg-white/10 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path
                                    className={!isMenuOpen ? 'block' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={isMenuOpen ? 'block' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="xl:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <a href="#consultation" onClick={handleNavClick} className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium block">
                                Консультация
                            </a>
                            <a href="#services" onClick={handleNavClick} className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium block">
                                Услуги
                            </a>
                            <a href="#faq" onClick={handleNavClick} className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium block">
                                Вопросы
                            </a>
                            <a href="#contacts" onClick={handleNavClick} className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium block">
                                Контакты
                            </a>
                            <div className="pt-4 pb-3 border-t border-white/20">
                                <div className="flex items-center px-3">
                                    <a href="tel:+79290123848" className="text-white font-semibold text-lg">
                                        +7 (929) 012-38-48
                                    </a>
                                </div>
                                <div className="mt-3 px-3 space-y-2">
                                    <a
                                        href="https://t.me/kodex_kvo"
                                        className="bg-sky-500 hover:bg-sky-600 text-white block px-4 py-2 rounded-md text-sm font-medium text-center"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Telegram
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
