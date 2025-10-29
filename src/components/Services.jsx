const Testimonials = () => {
    const services = [
        {
            icon: '💰',
            title: 'Перерасчет заработных плат',
            description: 'Помощь в перерасчете денежного довольствия и надбавок'
        },
        {
            icon: '🛡️',
            title: 'Установление статуса военнослужащего',
            description: 'Юридическое сопровождение при установлении и подтверждении статуса'
        },
        {
            icon: '⚕️',
            title: 'Военно-врачебная комиссия',
            description: 'Сопровождение и обжалование решений ВВК'
        },
        {
            icon: '⚖️',
            title: 'Признание брака фиктивным',
            description: 'Защита интересов военнослужащих в семейных спорах'
        },
        {
            icon: '🏛️',
            title: 'Денежные средства в следствии гибели',
            description: 'Сопровождение в получении выплат и компенсаций'
        },
        {
            icon: '🎖️',
            title: 'Льготы и социальные выплаты',
            description: 'Помощь в оформлении и получении льгот, компенсаций и социальных выплат для военнослужащих и членов их семей'
        }
    ];

    return (
        <section id="services" className="relative py-8 sm:py-12 lg:py-20 overflow-hidden bg-white">

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4">
                        Юридическая помощь военнослужащим
                    </h2>
            
                    <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto px-2 sm:px-0 leading-relaxed">
                        Перерасчет заработных плат, помощь в установлении статуса военнослужащего, сопровождение и обжалование военно-врачебной комиссии, признание брака фиктивным, сопровождение в получении денежных средств в следствии гибели военнослужащего
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative"
                        >
                            <div className="cursor-pointer relative h-full bg-gradient-to-br from-emerald-100 via-teal-50 to-green-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-emerald-400 hover:border-emerald-600 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                
                                {/* Icon */}
                                <div className="relative mb-4 sm:mb-6">
                                    <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-emerald-300 to-green-300 text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300 shadow-md">
                                        {service.icon}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="relative">
                                    <h3 className="text-lg sm:text-xl font-bold text-emerald-900 mb-2 sm:mb-3 group-hover:text-emerald-700 transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>

                                {/* Decorative corner accent */}
                                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500/15 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>

                            {/* Glow effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-700 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10"></div>
                        </div>
                    ))}
                </div>

                {false && <div className="mt-12 sm:mt-16">
                    <div className="relative">
                        {/* Green marble background for featured card */}
                        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 opacity-60"></div>
                        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-green-100/50 via-transparent to-emerald-100/50"></div>
                        
                        {/* Marble texture */}
                        <div className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-20" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                        }}></div>

                        <div className="relative backdrop-blur-sm bg-white/60 rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-emerald-300 shadow-xl">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl flex items-center justify-center shadow-lg">
                                        <span className="text-2xl sm:text-3xl">🚗</span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                                        Восстановление водительских прав
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                        Оказание содействия в восстановлении водительского удостоверения, изъятого или лишенного на основании решения суда
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}

                {/* Trust badge */}
                <div className="mt-12 sm:mt-16 text-center">
                    <div className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-emerald-100 backdrop-blur-sm border-2 border-emerald-300 rounded-xl sm:rounded-2xl shadow-lg">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="text-emerald-800 font-semibold text-sm sm:text-base">
                            ✅ Специализированная помощь военнослужащим, мобилизованным и добровольцам
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
