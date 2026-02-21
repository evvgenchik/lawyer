import { useState, useRef, useEffect } from 'react';

const getItemsPerPage = () => {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
};

const Reviews = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [animKey, setAnimKey] = useState(0);
    const [direction, setDirection] = useState('right');
    const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage);

    useEffect(() => {
        const handleResize = () => {
            const next = getItemsPerPage();
            setItemsPerPage(prev => {
                if (prev !== next) setCurrentPage(0);
                return next;
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const touchStartX = useRef(null);
    const touchStartY = useRef(null);
    const wheelAccum = useRef(0);
    const wheelTimer = useRef(null);

    const handleWheel = (e) => {
        if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
        e.preventDefault();
        wheelAccum.current += e.deltaX;
        clearTimeout(wheelTimer.current);
        wheelTimer.current = setTimeout(() => {
            if (wheelAccum.current > 40) goNext();
            else if (wheelAccum.current < -40) goPrev();
            wheelAccum.current = 0;
        }, 80);
    };

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
        if (touchStartX.current === null) return;
        const deltaX = touchStartX.current - e.changedTouches[0].clientX;
        const deltaY = touchStartY.current - e.changedTouches[0].clientY;
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0) goNext();
            else goPrev();
        }
        touchStartX.current = null;
        touchStartY.current = null;
    };

    const Reviews = [
        {
            name: 'Андрей Николаев',
            text: 'Обращался к Владиславу Олеговичу по вопросу с военным билетом. До этого несколько раз проходил комиссии, но всё было формально, на здоровье особо никто не смотрел. На консультации подробно разобрали мою ситуацию, обратили внимание на заболевание, на которое раньше вообще никто не делал акцент. Подсказали, какие обследования пройти и как правильно всё оформить. В итоге вопрос удалось решить довольно быстро. Спасибо за нормальное человеческое отношение и грамотный подход.',
            amount: 'Консультация',
            image: '/images/reviews/person1.jpg',
            rating: 5
        },
        {
            name: 'Светлана Хорьякова',
            text: 'Если вы столкнулись с проблемой, которая завела вас в тупик и кажется нерешаемой, обратитесь за помощью к команде профессионалов. На первой же консультации, которая длилась два часа, мне предложили несколько вариантов решения моего вопроса! "На пальцах" объяснили весь непростой механизм работы, вплоть до возможных самостоятельных дальнейших действий. В процессе общения чувствовался профессиализм, желание именно помочь и быть полезными. Ребята сработали чётко, без лишней "воды". Спасибо команде! Рекомендую!',
            amount: 'Консультация',
            image: '/images/reviews/person2.jpg',
            rating: 5
        },
        {
            name: 'Анна Кафтайлова',
            text: 'Обращалась к юристу Коротееву Владиславу Олеговичу с трудовой проблемой, когда на работе начался настоящий стресс.\nЯркие моменты истории. Начальница предложила 50% оплаты на процедуру. С условием, если срок работы в компании станет «от года», то погасит оставшиеся 50%, тем самым вернет ту часть денег, которую я внесла. Когда волнения на работе стали невыносимыми, а до «года» оставался месяц, я уже не могла терпеть и решила уволиться. Через время после написания заявления на увольнение мне выставляют чек, который мне нужно выплатить. Туда вошли те 50%, которые по нашей договоренности были оплачены начальницей. Штрафы за пользование телефоном в рабочее время, штрафы за питье кофе не во время перерыва, оплата за чайник, который разбился по моей вине (хохма в том, что она сказала «не переживай, я собиралась его менять) и т д\n\nВ общем, Владислав Олегович первое, что сделал — успокоил меня, объяснил всё простым и понятным языком, дал чёткое понимание, что ситуация решаемая. Он помог разобраться с документами, подсказал, как правильно отстаивать свои права, и был на связи, когда возникали вопросы. Очень ценно, что чувствовалось не формальное отношение, а искреннее желание помочь.\n\nВ итоге, вопрос удалось решить без скандалов и затяжных разбирательств.\n\nМое почтение Владиславу Олеговичу за профессионализм и человеческое отношение, а также за сохранность остатка моих нервных клеток.\n\nТоварищи, настоятельно рекомендую 💯',
            amount: 'Трудовой вопрос',
            image: '/images/reviews/person3.jpg',
            rating: 5
        },
        {
            name: 'Сергей Марьяновский',
            text: 'Хочу передать спасибо Роньшину Ивану Викторовичу за помощь в моей проблеме.\nОбращался по вопросу перерасчета моего денежного довольствия боевых выплат по сво с июля месяца. Иван Викторович провёл большую работу с моим наболевшим вопросом и я получил все выплаты.\nВсем советую обращаться за помощью!',
            amount: 'Выплаты',
            image: '/images/reviews/person4.jpg',
            rating: 5
        },
        {
            name: 'Александр Гайнуллин',
            text: 'Приветствую всех кто читает мой отзыв, хочу выразить огромную благодарность мужчинам юристам за понимание и быструю оперативную работу, проделаную как мне козалось в тупиковой ситуации.Блогодоря велеколепной слаженной работе удолось в суде доказать свою правоту и отстоять свои интересы.Ещё раз хочу поблагодарить и посоветовать ести возникают проблемы которые как вам кажутся не решимы это не так.Оброщайтесь за помощью вам обязательно помогут.',
            amount: 'Судебное дело',
            image: '/images/reviews/person5.jpg',
            rating: 5
        },
        {
            name: 'Евгений Переев',
            text: 'Пришел чуть раньше, попросили подождать, предложили чай, кофе. К назначенному времени пригласили в кабинет, где юрист мне грамотно и просто все объяснил. Расписал все этапы работы. По данной консультации я работал самостоятельно, все получилось. Команде очень благодарен!',
            amount: 'Консультация',
            image: '/images/reviews/person6.jpg',
            rating: 5
        },
        {
            name: 'Даниил Громов',
            text: 'Заказывала компьютер на Ozon, и, к сожалению, он пришёл уже в нерабочем состоянии. Сразу обратилась в поддержку, но столкнулась с полным игнором: ответы были формальные, возврат затягивали, по факту никто не брал на себя ответственность. Было ощущение, что просто тянут время в надежде, что я сдамся.\n\nВ этой ситуации я обратилась за помощью к юристу Коротееву Владиславу Олеговичу. Он внимательно разобрался в ситуации, объяснил мои права как потребителя и сразу сказал, что отказ незаконен. Юрист взял на себя всю переписку и подготовку претензий, мне не пришлось тратить нервы и время.\n\nПосле грамотных юридических действий вопрос с Ozon сдвинулся с мёртвой точки: со мной вышли на связь и проблема была решена в мою пользу. Огромное спасибо за реальную помощь и поддержку. Рекомендую Коротеева Владислава Олеговича всем, кто столкнулся с нарушением прав потребителей и не знает, как добиться справедливости.',
            amount: 'Потребительский спор',
            image: '/images/reviews/person7.jpg',
            rating: 5
        },
        {
            name: 'Илья Булычев',
            text: 'Отличная компания, обратился в тяжелейшей ситуации, казалось бы не разрешимой, был приятно удивлен. Большое спасибо всей команде, очень помогли и отдельная благодарность Илье Булычеву, толковый и подкованный юрист. Спасибо.',
            amount: 'Сложная ситуация',
            image: '/images/reviews/person8.jpg',
            rating: 5
        },
        {
            name: 'Николай Кузнецов',
            text: 'Обращался за консультацией. Всё объяснили простыми словами, помогли оформить документы и даже подсказали, как действовать дальше. Очень вежливые специалисты, видно, что реально хотят помочь.',
            amount: 'Консультация',
            image: '/images/reviews/person9.jpg',
            rating: 5
        },
        {
            name: 'Мария Смирнова',
            text: 'Сначала сомневалась…компания новая, отзывов мало. Но решила рискнуть и не пожалела. Ребята реально стараются, всегда на связи и помогают до результата. Очень довольна, теперь смело рекомендую всем!!!!!',
            amount: 'Консультация',
            image: '/images/reviews/person10.jpg',
            rating: 5
        },
        {
            name: 'Екатерина Петрова',
            text: 'Все понравилось, обьясняют доступным языком, вежливые и приветливые специалисты, вопрос решили в короткий срок, одним словом осталась довольна и буду рекомендовать всем.',
            amount: 'Консультация',
            image: '/images/reviews/person11.jpg',
            rating: 5
        },
        {
            name: 'Ярослав Фаустов',
            text: 'Обратился к ребятам за помощью , рассказали все как что надо делать очень понятно и раскрыто , поэтому советую парней , все объяснят и разъяснят, и решат вашу проблему тоже !!!',
            amount: 'Консультация',
            image: '/images/reviews/person12.jpg',
            rating: 5
        },
        {
            name: 'Данил Соколов',
            text: 'Отличная юридическая компания, всегда работают оперативно и на результат. Буду обращаться снова и советовать коллегам.',
            amount: 'Консультация',
            image: '/images/reviews/person13.jpg',
            rating: 5
        },
        {
            name: 'Руслан Ахметов',
            text: 'Обратился в юридическую компанию «Кодекс» по семейному вопросу. Сразу почувствовал, что меня слушают и понимают. Все объяснили простым языком, помогли собрать документы, грамотно подготовили заявление. Самое главное — я не чувствовал себя один на один с проблемой, а рядом был профессионал, который реально помогает.',
            amount: 'Семейный вопрос',
            image: '/images/reviews/person14.jpg',
            rating: 5
        },
        {
            name: 'Александр Самсонов',
            text: 'Дядя вернулся с СВО с раненой ногой, выплаты тянули, везде отмазки. Друг посоветовал этих юристов. Пришли, рассказали ситуацию, нас немного обнадежили и по итогу сработали как надо. В подвешенном состоянии тоже не были, на вопросы всегда отвечали. В общем главное выплаты получили, так что рекомендую.',
            amount: 'Выплаты',
            image: '/images/reviews/person15.jpg',
            rating: 5
        },
    ];

    const totalPages = Math.ceil(Reviews.length / itemsPerPage);
    const pageStart = currentPage * itemsPerPage;
    const visibleReviews = Reviews.slice(pageStart, pageStart + itemsPerPage);

    const goNext = () => {
        if (currentPage >= totalPages - 1) return;
        setDirection('right');
        setCurrentPage(p => p + 1);
        setAnimKey(k => k + 1);
    };

    const goPrev = () => {
        if (currentPage <= 0) return;
        setDirection('left');
        setCurrentPage(p => p - 1);
        setAnimKey(k => k + 1);
    };

    const goToPage = (page) => {
        if (page === currentPage) return;
        setDirection(page > currentPage ? 'right' : 'left');
        setCurrentPage(page);
        setAnimKey(k => k + 1);
    };

    return (
        <section id="Reviews" className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-8">
                <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4">
                        💬 Отзывы наших клиентов
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2 sm:px-0">
                        Реальные истории людей, которым мы помогли получить справедливые выплаты и защитить свои права
                    </p>
                </div>

                <div className="LOX relative h-[540px] sm:h-[440px] lg:h-[540px]">
                    {/* Left arrow */}
                    {currentPage > 0 && (
                        <button
                            onClick={goPrev}
                            className="hidden xl:flex absolute -left-[52px] top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:from-blue-400 hover:to-blue-600 hover:scale-110 active:scale-95 transition-all duration-200"
                            aria-label="Предыдущие отзывы"
                        >
                            <svg className="w-5 h-5 translate-x-[-1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}

                    {/* Right arrow */}
                    {currentPage < totalPages - 1 && (
                        <button
                            onClick={goNext}
                            className="hidden xl:flex absolute -right-[52px] top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:from-blue-400 hover:to-blue-600 hover:scale-110 active:scale-95 transition-all duration-200"
                            aria-label="Следующие отзывы"
                        >
                            <svg className="w-5 h-5 translate-x-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}

                    <div
                        className="overflow-hidden"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                        onWheel={handleWheel}
                    >
                    <div
                        key={animKey}
                        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 ${
                            direction === 'right' ? 'animate-carouselFromRight' : 'animate-carouselFromLeft'
                        }`}
                    >
                        {visibleReviews.map((testimonial, index) => (
                            <div
                                key={testimonial.name}
                                className={`relative group transition-all duration-500 h-[540px] sm:h-[440px] lg:h-[540px]`}
                            >
                                <div className={`relative backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border-2 transition-all duration-300 flex flex-col h-full overflow-hidden`}>
                                    {/* Stars */}
                                    <div className="flex mb-3 sm:mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>

                                    <blockquote className="text-gray-700 mb-4 sm:mb-6 italic text-base sm:text-lg leading-relaxed flex-grow overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                        {testimonial.text}
                                    </blockquote>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                className="w-12 h-12 rounded-full mr-4 shrink-0"
                                            />
                                            <div>
                                                <cite className="font-semibold text-gray-900 not-italic text-sm sm:text-base">
                                                    {testimonial.name}
                                                </cite>
                                                <p className="text-xs sm:text-sm text-gray-600">{testimonial.role}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-md sm:text-lg font-bold text-green-600">
                                                {testimonial.amount}
                                            </div>
                                            <div className="text-xs text-gray-500">получено</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>

                    {/* Navigation dots (per page) */}
                    <div className="flex justify-center mt-6 sm:mt-8 space-x-2 sm:space-x-3">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToPage(index)}
                                className={`rounded-full transition-all duration-300 w-2 h-2 sm:w-3 sm:h-3 ${
                                    currentPage === index
                                        ? 'bg-blue-500'
                                        : 'bg-gray-300 hover:bg-gray-400 w-2 h-2 sm:w-3 sm:h-3'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Trust indicators */}
                <div className="mt-12 sm:mt-16 text-center">
                    <div className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-green-100 rounded-full">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="text-green-700 font-semibold text-sm sm:text-base">✅ Проверенные отзывы от реальных клиентов</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reviews;
