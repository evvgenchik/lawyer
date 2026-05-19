const YandexMap = () => {
    return (
        <section className="bg-gray-50 py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
                        Наш офис в Липецке
                    </h2>
                    <p className="text-lg text-gray-600">
                        Приходите на консультацию или свяжитесь с нами удобным способом
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    {/* Map */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[500px]">
                        <iframe
                            src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=202420305965"
                            width="100%"
                            height="500"
                            frameBorder="0"
                            title="Офис Кодекс48 в Липецке на карте"
                            className="w-full h-full"
                            loading="lazy"
                            aria-label="Интерактивная карта с местоположением офиса Кодекс48 в Липецке"
                        ></iframe>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col">
                        <div className="bg-white rounded-xl shadow-xl p-8 h-full flex flex-col border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Контактная информация</h3>
                            
                            <div className="space-y-4">
                                {/* Address */}
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900">Адрес офиса</p>
                                        <p className="mt-1 text-sm text-gray-600">
                                            г. Липецк, ул. Фрунзе, д.43, 1 этаж (4 помещение)
                                        </p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900">Телефон</p>
                                        <a href="tel:+79290123848" className="mt-1 text-sm text-blue-600 hover:text-blue-700">
                                            +7 (929) 012-38-48
                                        </a>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900">Email</p>
                                        <a href="mailto:kodex48@mail.ru" className="mt-1 text-sm text-blue-600 hover:text-blue-700">
                                            kodex48@mail.ru
                                        </a>
                                    </div>
                                </div>

                                {/* Working Hours */}
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900">Режим работы</p>
                                        <p className="mt-1 text-sm text-gray-600">
                                            ПН-ПТ: 9:00-19:00
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            СБ: 9:00-14:00
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            ВС - выходной
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Messengers */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <p className="text-sm font-medium text-gray-900 mb-3">Мессенджеры</p>
                                <div className="flex space-x-4">
                                    <a
                                        href="https://t.me/kodex_kvo"
                                        className="inline-flex items-center justify-center px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors text-sm"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.121.099.155.232.171.326.016.093.036.305.02.469z"/>
                                        </svg>
                                        Telegram
                                    </a>
                                    <a
                                        href="https://max.ru/u/f9LHodD0cOKcBw19oDA03n27PHhQ-3-l37vRpaCdykDZoOq23T0BDP0lQq0"
                                        className="inline-flex items-center justify-center px-4 py-2 bg-[#708FE9] hover:bg-[#9164DE] text-white rounded-lg transition-colors text-sm"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img src="/images/max.svg" alt="MAX" className="h-5 w-5 mr-2" />
                                        MAX
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default YandexMap;
