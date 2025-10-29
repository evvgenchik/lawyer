const ConsultationForm = () => {
    const contactMethods = [
        {
            title: 'Позвоните нам',
            description: 'Ежедневно с 9:00 до 21:00, звонок бесплатный по России.',
            action: '+7 (929) 012-38-48',
            href: 'tel:+79290123848',
            accent: 'bg-green-500',
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                </svg>
            )
        },
        {
            title: 'Напишите в WhatsApp',
            description: 'Отвечаем мгновенно, отправим перечень документов и предложим план действий.',
            action: 'Открыть чат',
            href: 'https://wa.me/79290123848',
            accent: 'bg-emerald-500',
            icon: (
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.703" />
                </svg>
            )
        },
        {
            title: 'Напишите в Telegram',
            description: 'Быстрый ответ, безопасная переписка и удобная отправка документов.',
            action: 'Открыть чат',
            href: 'https://t.me/kodex_kvo',
            accent: 'bg-sky-500',
            icon: (
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
            )
        },
        {
            title: 'Запишитесь на встречу',
            description: 'Приходите в офис или назначьте видеоконференцию в удобное время.',
            action: 'Назначить встречу',
            href: '#contact',
            accent: 'bg-blue-500',
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2h-3.17a2 2 0 01-1.41-.59l-.83-.82a2 2 0 00-1.41-.59H9.41a2 2 0 00-1.41.59l-.83.82a2 2 0 01-1.41.59H3a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            )
        }
    ];

    const guarantees = [
        'Первая консультация бесплатно',
        'Работаем с делами любой сложности и в любой точке России',
        'Берёмся только за те дела, где видим реальную перспективу',
        'Все обсуждения и документы остаются конфиденциальными',
        'Предоставляем пошаговый план и сопровождаем до результата'
    ];

    return (
        <section
            id="contacts"
            className="relative py-10 sm:py-14 lg:py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden"
        >
            <div className="absolute inset-0 opacity-20">
                <div className="absolute -top-16 -left-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-indigo-400 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-semibold uppercase tracking-widest text-blue-100">
                        Бесплатная консультация
                    </span>
                    <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                        Свяжитесь с нами удобным способом — мы рядом на каждом шаге вашего дела
                    </h2>
                    <p className="mt-4 text-base sm:text-lg lg:text-xl text-blue-100">
                        Юристы крупной практики подготовят стратегию защиты и подскажут, как действовать прямо сейчас.
                    </p>
                </div>

                <div className="lg:grid lg:grid-cols-3 lg:gap-8 items-start">
                    <div className="space-y-4 sm:space-y-6">
                        {contactMethods.map(method => (
                            <a
                                key={method.title}
                                href={method.href}
                                className="group block bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:bg-white/15 hover:-translate-y-1"
                            >
                                <div className="flex items-center">
                                    <div className={`${method.accent} flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-black/20 transition-transform group-hover:scale-110`}>
                                        {method.icon}
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-white">{method.title}</h3>
                                        <p className="text-sm text-blue-100 mt-1 leading-snug">{method.description}</p>
                                        <span className="mt-3 inline-flex items-center text-sm font-semibold text-white/90 group-hover:text-white">
                                            {method.action}
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    <div className="mt-6 sm:mt-8 lg:mt-0 lg:col-span-2">
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                            <div className="px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                                    <div>
                                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                            Что вы получите на первой консультации
                                        </h3>
                                        <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-xl">
                                            Разберём ситуацию, оценим перспективы, предложим стратегию и расскажем о сроках и этапах. Консультация бесплатна и ни к чему вас не обязывает.
                                        </p>
                                    </div>
                                    <div className="bg-blue-50 border border-blue-100 rounded-2xl px-4 py-4 sm:px-5 sm:py-5 shadow-inner">
                                        <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
                                            15 минут
                                        </p>
                                        <p className="mt-1 text-sm text-blue-900">
                                            В среднем занимает первичный диалог — отвечаем быстро
                                        </p>
                                    </div>
                                </div>

                                <ul className="mt-6 sm:mt-8 grid gap-4 sm:gap-5 md:grid-cols-2">
                                    {guarantees.map(item => (
                                        <li
                                            key={item}
                                            className="flex items-start bg-gray-50 border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm"
                                        >
                                            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mt-0.5">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <p className="ml-4 text-sm sm:text-base text-gray-700 leading-relaxed">{item}</p>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-8 sm:mt-10">
                                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 sm:p-7 text-white">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                            <div>
                                                <h4 className="text-lg font-semibold">Нужна помощь уже сейчас?</h4>
                                                <p className="text-sm text-blue-100 mt-1">
                                                    Мы подготовим документы, свяжемся с оппонентами и возьмём переговоры на себя.
                                                </p>
                                            </div>
                                            <div className="flex flex-col sm:flex-row gap-2">
                                                <a
                                                    href="tel:+79290123848"
                                                    className="inline-flex items-center justify-center px-3 py-2 bg-white text-blue-700 font-semibold rounded-lg text-sm hover:bg-blue-50 transition"
                                                >
                                                    Позвонить
                                                </a>
                                                <a
                                                    href="https://wa.me/79290123848"
                                                    className="inline-flex items-center justify-center px-3 py-2 bg-white/10 text-white font-semibold rounded-lg text-sm border border-white/30 hover:bg-white/20 transition"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    WhatsApp
                                                </a>
                                                <a
                                                    href="https://t.me/kodex_kvo"
                                                    className="inline-flex items-center justify-center px-3 py-2 bg-white/10 text-white font-semibold rounded-lg text-sm border border-white/30 hover:bg-white/20 transition"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Telegram
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConsultationForm;
