import { useState, useEffect } from 'react';

const statsData = [
    {
        number: 300,
        suffix: '+',
        label: 'млн. ₽ страховых выплат',
        description: 'получили для клиентов',
        icon: '💰',
        color: 'from-green-400 to-emerald-600'
    },
    {
        number: 100,
        suffix: '+',
        label: 'мобилизованных',
        description: 'вернули с боевых действий',
        icon: '🛡️',
        color: 'from-blue-400 to-blue-600'
    },
    {
        number: 5,
        suffix: '+',
        label: 'лет опыта',
        description: 'в военном праве',
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
        <section id="stats-section" className="relative py-10 sm:py-20 overflow-hidden">
            {/* Background with animated gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>

            {/* Floating background elements */}
            <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 sm:mb-16">
                    <h2 className={`text-2xl font-extrabold text-white sm:text-5xl transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        📊 Наши результаты
                    </h2>
                    <p className={`mt-3 sm:mt-6 text-sm sm:text-xl text-blue-200 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        Цифры, которые говорят о нашем профессионализме и результативности
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4">
                    {statsData.map((stat, index) => (
                        <div
                            key={index}
                            className={`relative group transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            style={{ animationDelay: `${index * 200}ms` }}
                        >
                            <div className="relative overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-8 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                                {/* Gradient overlay on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl`}></div>

                                {/* Icon */}
                                <div className="text-center mb-3 sm:mb-6">
                                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-16 sm:h-16 rounded-2xl bg-white/20 text-xl sm:text-3xl mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                                        {stat.icon}
                                    </div>
                                </div>

                                {/* Animated Number */}
                                <div className="text-center relative z-10">
                                    <div className="text-3xl sm:text-5xl font-black text-white mb-1 sm:mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                                        {isVisible ? animatedNumbers[index] : 0}{stat.suffix}
                                    </div>

                                    <div className="text-xs sm:text-lg font-semibold text-blue-200 mb-1 sm:mb-2 group-hover:text-white transition-colors duration-300">
                                        {stat.label}
                                    </div>

                                    <div className="text-xs sm:text-sm text-blue-300 group-hover:text-blue-100 transition-colors duration-300">
                                        {stat.description}
                                    </div>
                                </div>

                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            </div>

                            {/* Glow effect */}
                            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10`}></div>
                        </div>
                    ))}
                </div>

                {/* Trust badge */}
                <div className={`mt-16 text-center transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl">
                        <svg className="w-8 h-8 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="text-white font-semibold text-lg">
                            ✅ Проверенные результаты • Гарантия качества • Работаем официально
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;
