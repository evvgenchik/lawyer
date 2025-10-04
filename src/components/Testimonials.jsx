import { useState } from 'react';

const Testimonials = () => {
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    const testimonials = [
        {
            name: 'Сергей Михайлович К.',
            role: 'Участник СВО',
            text: 'Благодаря юристам получил страховые выплаты в полном объеме. Процесс занял всего 2 месяца, хотя изначально мне отказали.',
            amount: '2,1 млн ₽',
            //image: 'https://via.placeholder.com/80x80/3B82F6/FFFFFF?text=СМ',
            rating: 5
        },
        {
            name: 'Александр Петрович В.',
            role: 'Мобилизованный',
            text: 'Помогли вернуться домой к семье. Профессиональный подход, все документы подготовили грамотно.',
            amount: 'Возвращение домой',
            //image: 'https://via.placeholder.com/80x80/3B82F6/FFFFFF?text=АП',
            rating: 5
        },
        {
            name: 'Дмитрий Андреевич М.',
            role: 'Доброволец',
            text: 'Отличные специалисты! Получил все положенные льготы и выплаты. Рекомендую всем военнослужащим.',
            amount: '1,8 млн ₽',
            //image: 'https://via.placeholder.com/80x80/3B82F6/FFFFFF?text=ДА',
            rating: 5
        }
    ];

    return (
        <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                        💬 Отзывы наших клиентов
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Реальные истории людей, которым мы помогли получить справедливые выплаты и защитить свои права
                    </p>
                </div>

                <div className="relative">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className={`relative group cursor-pointer transition-all duration-500 ${
                                    activeTestimonial === index
                                        ? 'transform scale-105 z-10'
                                        : 'hover:transform hover:scale-102'
                                }`}
                                onClick={() => setActiveTestimonial(index)}
                            >
                                <div className={`relative backdrop-blur-sm rounded-2xl p-8 border-2 transition-all duration-300 ${
                                    activeTestimonial === index
                                        ? 'bg-white/90 border-blue-500 shadow-2xl shadow-blue-500/20'
                                        : 'bg-white/70 border-white/50 shadow-lg hover:shadow-xl'
                                }`}>
                                    {/* Stars */}
                                    <div className="flex mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>

                                    <blockquote className="text-gray-700 mb-6 italic text-lg leading-relaxed">
                                        "{testimonial.text}"
                                    </blockquote>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            {/* <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                className="w-12 h-12 rounded-full mr-4 border-2 border-white shadow-lg"
                                            /> */}
                                            <div>
                                                <cite className="font-semibold text-gray-900 not-italic">
                                                    {testimonial.name}
                                                </cite>
                                                <p className="text-sm text-gray-600">{testimonial.role}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xl font-bold text-green-600">
                                                {testimonial.amount}
                                            </div>
                                            <div className="text-xs text-gray-500">получено</div>
                                        </div>
                                    </div>

                                    {/* Active indicator */}
                                    {activeTestimonial === index && (
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 pointer-events-none"></div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation dots */}
                    <div className="flex justify-center mt-8 space-x-3">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveTestimonial(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    activeTestimonial === index
                                        ? 'bg-blue-500 transform scale-125'
                                        : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Trust indicators */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center px-6 py-3 bg-green-100 rounded-full">
                        <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="text-green-700 font-semibold">✅ Проверенные отзывы от реальных клиентов</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
