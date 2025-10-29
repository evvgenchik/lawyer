const Footer = () => {
    return (
        <footer id="contact" className="bg-custom-blue">
            <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center">
                            <h3 className="text-2xl sm:text-3xl lg:text-6xl font-extrabold text-white tracking-tight"
                                style={{ 
                                    fontFamily: '"Playfair Display", "Georgia", serif',
                                    color: '#000000',
                                    WebkitTextStroke: '5px #ffffff',
                                    paintOrder: 'stroke fill'
                                }}
                                >
                                Кодекс
                            </h3>
                        </div>
                        <p className="mt-4 sm:mt-5 text-gray-300 text-base sm:text-lg leading-relaxed max-w-md">
                            Ваша уверенность в завтрашнем дне начинается с грамотной защиты прав.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-3 sm:mb-4">
                            Контакты
                        </h3>
                        <ul className="space-y-2 sm:space-y-3">
                            <li>
                                <a href="tel:+79290123848" className="text-gray-300 hover:text-white flex items-center text-sm sm:text-base">
                                    <svg className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span className="break-all">+7 (929) 012-38-48</span>
                                </a>
                            </li>
                            <li>
                                <a href="mailto:kodex48@mail.ru" className="text-gray-300 hover:text-white flex items-center text-sm sm:text-base">
                                    <svg className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="break-all">kodex48@mail.ru</span>
                                </a>
                            </li>
                            <li>
                                <div className="text-gray-300 flex items-start text-sm sm:text-base">
                                    <svg className="h-4 w-4 sm:h-5 sm:w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>г. Липецк, пл. Петра Великого, д. 5, офис 202 (вход через деловой центр, второй этаж)</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-3 sm:mb-4">
                            График работы
                        </h3>
                        <ul className="space-y-1 sm:space-y-2">
                            <li className="text-gray-300 text-sm sm:text-base">
                                <span className="font-medium">ПН-ПТ:</span> 9:00-19:00
                            </li>
                            <li className="text-gray-300 text-sm sm:text-base">
                                <span className="font-medium">СБ:</span> 9:00-14:00
                            </li>
                            <li className="text-gray-300 text-sm sm:text-base">
                                <span className="font-medium">ВС</span> – выходной
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-3 sm:mb-4">
                            Мессенджеры
                        </h3>
                        <div className="flex space-x-3 sm:space-x-4">
                            <a
                                href="https://wa.me/79290123848"
                                className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="sr-only">WhatsApp</span>
                                <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.888 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.703"/>
                                </svg>
                            </a>
                            <a
                                href="https://t.me/kodex_kvo"
                                className="text-gray-400 hover:text-sky-400 transition-colors duration-300"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="sr-only">Telegram @kodex_kvo</span>
                                <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="currentColor" viewBox="0 0 22 22">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-6 sm:mt-8 border-t border-gray-700 pt-6 sm:pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
                            <p>ИП Дроворуб Андрей Юрьевич</p>
                            <p>ИНН 480701284458 | ОГРНИП: 325480000054062</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating WhatsApp Button */}
            <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
                <a
                    href="https://wa.me/79290123848"
                    className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.703"/>
                    </svg>
                </a>
            </div>
        </footer>
    );
};

export default Footer;
