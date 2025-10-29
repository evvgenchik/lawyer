import { useState } from 'react';

const FAQ = () => {
    const [activeQuestions, setActiveQuestions] = useState([]);

    const faqs = [
        {
            question: 'Какую помощь вы оказываете участникам СВО?',
            answer: 'Мы предоставляем полный спектр юридических услуг: перерасчет денежного довольствия, получение положенных выплат и компенсаций, сопровождение на ВВК, оформление статуса военнослужащего, помощь в получении льгот и социальных выплат, юридическую защиту прав и интересов.',
            icon: '🎖️'
        },
        {
            question: 'Какие выплаты положены военнослужащим СВО?',
            answer: 'Участникам СВО положены: единовременные выплаты при заключении контракта, ежемесячное денежное довольствие, выплаты за ранение, компенсации семьям в случае гибели, региональные доплаты и надбавки. Размер выплат зависит от звания, должности и региона. Мы поможем рассчитать и получить все положенные суммы.',
            icon: '💰'
        },
        {
            question: 'Как получить льготы для семьи военнослужащего?',
            answer: 'Семьям военнослужащих положены: льготы по ЖКХ, налоговые вычеты, компенсация аренды жилья, образовательные льготы для детей, льготы на путевки и санаторно-курортное лечение. Мы поможем собрать документы и оформить все положенные льготы.',
            icon: '👨‍👩‍👧‍👦'
        },
        {
            question: 'Что делать при несогласии с решением ВВК?',
            answer: 'Решение военно-врачебной комиссии можно обжаловать в вышестоящей ВВК или через суд. Мы имеем успешный опыт обжалования решений ВВК, помогаем собрать медицинские документы, составляем жалобы и представляем интересы в судебных инстанциях.',
            icon: '⚕️'
        },
        {
            question: 'Работаете ли вы с мобилизованными и контрактниками?',
            answer: 'Да, мы работаем со всеми категориями военнослужащих: мобилизованными, контрактниками, добровольцами и членами их семей. Предоставляем консультации дистанционно по всей России через телефон, WhatsApp и Telegram.',
            icon: '🛡️'
        },
        {
            question: 'Сколько стоят ваши услуги?',
            answer: 'Первая консультация для военнослужащих и их семей БЕСПЛАТНО. Дальнейшая стоимость зависит от сложности дела. Работаем по принципу "результат-оплата" - оплата производится после получения положительного результата. Для участников СВО действуют специальные условия.',
            icon: '🎯'
        }
    ];

    return (
        <section id="faq" className="py-8 sm:py-12 lg:py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4">
                        Помощь участникам СВО
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
                        Ответы на важные вопросы о юридической помощи военнослужащим
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="group relative"
                        >
                            {/* Green marble background */}
                            <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                            <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-green-100/50 via-transparent to-emerald-100/50"></div>
                            
                            {/* Marble texture overlay */}
                            <div className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-20" style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                            }}></div>

                            <div className={`relative backdrop-blur-sm bg-white/60 hover:bg-white/70 rounded-xl sm:rounded-2xl transition-all duration-500 ease-in-out overflow-hidden border-2 ${
                                activeQuestions.includes(index)
                                    ? 'border-emerald-500 shadow-lg'
                                    : 'border-emerald-200/50 hover:border-emerald-400 shadow-md'
                            }`}>
                                <button
                                    className="w-full px-4 py-4 sm:px-6 sm:py-5 text-left flex items-center justify-between focus:outline-none"
                                    onClick={() => {
                                        setActiveQuestions(prev =>
                                            prev.includes(index)
                                                ? prev.filter(i => i !== index)
                                                : [...prev, index]
                                        );
                                    }}
                                >
                                    <div className="flex items-center">
                                        <span className="text-xl sm:text-2xl mr-3 sm:mr-4">{faq.icon}</span>
                                        <span className={`text-base sm:text-lg font-semibold transition-colors duration-500 ease-in-out ${
                                            activeQuestions.includes(index) ? 'text-emerald-700' : 'text-gray-900'
                                        }`}>
                                            {faq.question}
                                        </span>
                                    </div>
                                    <div className={`transition-transform duration-500 ease-in-out ${
                                        activeQuestions.includes(index) ? 'rotate-180' : 'rotate-0'
                                    }`}>
                                        <svg className={`w-5 h-5 sm:w-6 sm:h-6 ${
                                            activeQuestions.includes(index) ? 'text-emerald-500' : 'text-gray-400'
                                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>

                                <div className={`transition-all duration-700 ease-out overflow-hidden ${
                                    activeQuestions.includes(index)
                                        ? 'max-h-96 opacity-100 transform translate-y-0'
                                        : 'max-h-0 opacity-0 transform -translate-y-2'
                                }`}>
                                    <div className="px-4 pb-4 sm:px-6 sm:pb-5">
                                        <div className={`pl-10 sm:pl-12 text-gray-700 leading-relaxed text-sm sm:text-base ${
                                            activeQuestions.includes(index) ? 'animate-fadeIn' : ''
                                        }`}>
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>

                                {/* Glow effect on hover */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to action */}
                <div className="mt-8 sm:mt-12">
                    <div className="relative">
                        {/* Green marble background for CTA */}
                        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-600 to-green-700"></div>
                        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-green-600/50 via-transparent to-emerald-600/50"></div>
                        
                        {/* Marble texture */}
                        <div className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-20" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                        }}></div>

                        <div className="relative backdrop-blur-sm p-6 sm:p-8 text-white">
                            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                                Не нашли ответ на свой вопрос?
                            </h3>
                            <p className="text-emerald-100 mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg">
                                Получите персональную консультацию для военнослужащих БЕСПЛАТНО
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                                <a
                                    href="tel:+79290123848"
                                    className="inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-white text-emerald-700 font-semibold rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors duration-300 text-sm sm:text-base shadow-lg"
                                >
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    Позвонить сейчас
                                </a>
                                <a
                                    href="https://wa.me/79290123848"
                                    className="inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-green-500 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-green-600 transition-colors duration-300 text-sm sm:text-base shadow-lg"
                                >
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.703"/>
                                    </svg>
                                    Написать в WhatsApp
                                </a>
                                <a
                                    href="https://t.me/kodex_kvo"
                                    className="inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-blue-500 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-blue-600 transition-colors duration-300 text-sm sm:text-base shadow-lg"
                                >
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                                    </svg>
                                    Telegram
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
