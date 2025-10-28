import { useState, useEffect } from 'react';

const statsData = [
    {
        number: 300,
        suffix: '+',
        label: 'млн. ₽ взыскано для клиентов',
        description: 'выплат и компенсаций',
        icon: '💰',
        color: 'from-green-400 to-emerald-600'
    },
    {
        number: 120,
        suffix: '+',
        label: 'довольных клиентов',
        description: 'по всей стране',
        icon: '🤝',
        color: 'from-blue-400 to-blue-600'
    },
    {
        number: 15,
        suffix: '+',
        label: 'лет опыта',
        description: 'в различных областях права',
        icon: '⚖️',
        color: 'from-purple-400 to-purple-600'
    },
    {
        number: 24,
        suffix: '/7',
        label: 'поддержка',
        description: 'дистанционно по России',
        icon: '🌍',
        color: 'from-orange-400 to-red-500'
    }
];

const Stats = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [animatedNumbers, setAnimatedNumbers] = useState([0, 0, 0, 0]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);

                    // Animate numbers
                    statsData.forEach((stat, index) => {
                        let start = 0;
                        const end = stat.number;
                        const duration = 2000;
                        const increment = end / (duration / 50);

                        const timer = setInterval(() => {
                            start += increment;
                            if (start >= end) {
                                start = end;
                                clearInterval(timer);
                            }

                            setAnimatedNumbers(prev => {
                                const newNumbers = [...prev];
                                newNumbers[index] = Math.floor(start);
                                return newNumbers;
                            });
                        }, 50);
                    });
                }
            },
            { threshold: 0.3 }
        );

        const section = document.getElementById('stats-section');
        if (section) observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section id="stats-section" className="relative py-8 sm:py-10 lg:py-20 overflow-hidden">
            {/* Background with animated gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>

            {/* Floating background elements */}
            <div className="hidden sm:block absolute top-10 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
            <div className="hidden sm:block absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-6 sm:mb-8 lg:mb-16">
                    <h2 className={`text-xl font-extrabold text-white sm:text-3xl lg:text-5xl transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        📊 Наши результаты
                    </h2>
                    <p className={`mt-2 sm:mt-3 lg:mt-6 text-xs sm:text-base lg:text-xl text-blue-200 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        Цифры, которые говорят о нашем профессионализме и результативности
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-8 lg:grid-cols-4">
                    {statsData.map((stat, index) => (
                        <div
                            key={index}
                            className={`relative group transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            style={{ animationDelay: `${index * 200}ms` }}
                        >
                            <div className="relative overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-8 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 active:scale-95 active:translate-y-0">
                                {/* Gradient overlay on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl`}></div>

                                {/* Icon */}
                                <div className="text-center mb-2 sm:mb-3 lg:mb-6">
                                    <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-white/20 text-lg sm:text-xl lg:text-3xl mb-1 sm:mb-2 lg:mb-4 group-hover:scale-110 transition-transform duration-300">
                                        {stat.icon}
                                    </div>
                                </div>

                                {/* Animated Number */}
                                <div className="text-center relative z-10">
                                    <div className="text-2xl sm:text-3xl lg:text-5xl font-black text-white mb-0.5 sm:mb-1 lg:mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                                        {isVisible ? animatedNumbers[index] : 0}{stat.suffix}
                                    </div>

                                    <div className="text-xs sm:text-sm lg:text-lg font-semibold text-blue-200 mb-0.5 sm:mb-1 lg:mb-2 group-hover:text-white transition-colors duration-300">
                                        {stat.label}
                                    </div>

                                    <div className="text-xs sm:text-sm text-blue-300 group-hover:text-blue-100 transition-colors duration-300">
                                        {stat.description}
                                    </div>
                                </div>

                                {/* Decorative elements */}
                                <div className="hidden sm:block absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="hidden sm:block absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            </div>

                            {/* Glow effect */}
                            <div className={`hidden sm:block absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10`}></div>
                        </div>
                    ))}
                </div>

                {/* Trust badge */}
                <div className={`mt-8 sm:mt-12 lg:mt-16 text-center transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-green-400 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="text-white font-semibold text-sm sm:text-base lg:text-lg">
                            <span className="hidden sm:inline">✅ Проверенные результаты • Гарантия качества • Работаем официально</span>
                            <span className="sm:hidden">✅ Проверенные результаты</span>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;
