const Services = () => {
    const services = [
        {
            id: '1',
            title: 'Получение страховых выплат',
            description: 'Все вопросы по страховым выплатам, связанным с СВО.',
            icon: (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
            )
        },
        {
            id: '2',
            title: 'Получение льгот',
            description: 'Трудности с получением определённых льгот для военнослужащих на СВО.',
            icon: (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
            )
        },
        {
            id: '3',
            title: 'Получение денежного довольствия',
            description: 'Несправедливые выплаты от государства участникам СВО.',
            icon: (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        },
        {
            id: '4',
            title: 'Вопросы увольнения',
            description: 'Все тонкости, касающиеся увольнения военнослужащих.',
            icon: (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        }
    ];

    return (
        <section id="services" className="py-8 sm:py-16 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                        ⚖️ Наши услуги
                    </h2>
                    <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
                        Комплексная юридическая поддержка для военнослужащих с гарантией результата
                    </p>
                </div>

                <div className="mt-8 sm:mt-16">
                    <div className="grid grid-cols-1 gap-4 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className="relative group"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group-hover:scale-105 h-full">
                                    {/* Gradient background on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    {/* Content */}
                                    <div className="relative p-4 sm:p-8 z-10 flex flex-col h-full">
                                        {/* Number badge */}
                                        <div className="absolute top-2 right-2 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                                            <span className="text-sm sm:text-xl font-black text-white">{service.id}</span>
                                        </div>

                                        {/* Icon */}
                                        <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white mb-6 group-hover:bg-white/20 transition-all duration-300">
                                            {service.icon}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4 group-hover:text-white transition-colors duration-300">
                                            {service.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-sm sm:text-base text-gray-600 group-hover:text-blue-100 transition-colors duration-300 leading-relaxed flex-grow">
                                            {service.description}
                                        </p>

                                        {/* Action button */}
                                        <div className="mt-6">
                                            <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold opacity-0 group-hover:opacity-100 group-hover:bg-white group-hover:text-blue-600 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                                Подробнее
                                            </button>
                                        </div>
                                    </div>

                                    {/* Decorative elements */}
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                </div>

                                {/* Floating effect */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <div className="bg-primary-50 rounded-lg p-8">
                        <h3 className="text-2xl font-bold text-primary-900 mb-4">
                            Какие ещё выплаты можно получить от государства
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h4 className="font-semibold text-lg mb-2">Получение страховки по Указу Президента</h4>
                                <p className="text-gray-600">За ранение, контузию или увечье на СВО</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h4 className="font-semibold text-lg mb-2">Страховка от СОГАЗА</h4>
                                <p className="text-gray-600">Дополнительные страховые выплаты</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h4 className="font-semibold text-lg mb-2">Льготы и компенсации</h4>
                                <p className="text-gray-600">Весь спектр социальных льгот</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <a
                        href="https://wa.me/79272588921"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 transition duration-300"
                    >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.703"/>
                        </svg>
                        Написать в WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Services;
