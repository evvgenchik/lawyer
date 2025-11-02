import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
        agreement: false
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handlePhoneFocus = () => {
        if (!formData.phone) {
            setFormData(prev => ({
                ...prev,
                phone: '+7'
            }));
        }
    };

    const handlePhoneChange = (e) => {
        let value = e.target.value;

        if (!value.startsWith('+7')) {
            value = '+7' + value.replace(/^\+7/, '');
        }

        const digitsOnly = value.replace(/[^\d+]/g, '');

        if (digitsOnly.length >= 2) {
            let formatted = '+7';
            if (digitsOnly.length > 2) {
                formatted += ' (' + digitsOnly.substring(2, Math.min(5, digitsOnly.length));
            }
            if (digitsOnly.length >= 6) {
                formatted += ') ' + digitsOnly.substring(5, Math.min(8, digitsOnly.length));
            }
            if (digitsOnly.length >= 9) {
                formatted += '-' + digitsOnly.substring(8, Math.min(10, digitsOnly.length));
            }
            if (digitsOnly.length >= 11) {
                formatted += '-' + digitsOnly.substring(10, Math.min(12, digitsOnly.length));
            }
            value = formatted;
        }

        setFormData(prev => ({
            ...prev,
            phone: value
        }));
    };

    const validatePhone = (phone) => {
        const cleanPhone = phone.replace(/[^\d]/g, '');
        return cleanPhone.length === 11 && cleanPhone.startsWith('7');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePhone(formData.phone)) {
            setError('Пожалуйста, введите корректный номер телефона в формате +7 (XXX) XXX-XX-XX');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const { error } = await supabase
                .from('consultations')
                .insert([
                    {
                        name: formData.name,
                        phone: formData.phone,
                        email: formData.email || null,
                        message: formData.message || null,
                        status: 'new',
                        service_type: 'Общая консультация'
                    }
                ]);

            if (error) throw error;

            setSuccess(true);
            setFormData({
                name: '',
                phone: '',
                email: '',
                message: '',
                agreement: false
            });

            setTimeout(() => setSuccess(false), 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setError('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="consultation" className="relative overflow-hidden bg-white" aria-labelledby="hero-heading">
            {/* Diagonal background sections */}
            <div className="absolute inset-0" aria-hidden="true">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-white"></div>
                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-blue-600/5 to-transparent transform skew-x-12 origin-top-right"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-600/5 to-transparent transform -skew-x-12"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                {/* Two-column asymmetric layout */}
                <div className="lg:grid lg:grid-cols-5 lg:gap-12 items-start">
                    {/* Left column - 3/5 width */}
                    <div className="lg:col-span-3 mb-12 lg:mb-0">
                        <div className={`transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                            {/* Main headline */}
                            <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                                Юридическая защита
                                <span className="block text-blue-600 mt-2">ваших прав и интересов</span>
                            </h1>

                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Комплексное юридическое сопровождение физических и юридических лиц. Работаем по всей России дистанционно и очно в Липецке.
                            </p>
                                
                                {/* Featured service - Military Law */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-md border-2 border-blue-200 hover:shadow-lg transition-shadow">
                                        <span className="text-4xl">🎖️</span>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 text-base">Военное право</h3>
                                            <p className="text-xs text-gray-600 mb-2">Защита военнослужащих, мобилизованных и добровольцев</p>
                                            <a 
                                                href="https://t.me/kodex48" 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center gap-2 px-3 py-1 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-lg transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.121.099.155.232.171.326.016.093.036.305.02.469z"/>
                                                </svg>
                                                Telegram канал 
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                    {[
                                        { icon: '⚖️', title: 'Гражданские дела', desc: 'Защита в судах любой инстанции' },
                                        { icon: '👮', title: 'Уголовное право', desc: 'Защита по уголовным делам' },
                                        { icon: '🏠', title: 'Административное право', desc: 'Сделки и споры' },
                                        { icon: '👨‍👩‍👧', title: 'Семейное право', desc: 'Разводы, алименты, опека' }
                                    ].map((service, index) => (
                                        <div key={index} className="flex items-start space-x-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                            <span className="text-2xl">{service.icon}</span>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 text-sm">{service.title}</h3>
                                                <p className="text-xs text-gray-500">{service.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="tel:+79290123848"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-600/30"
                                    aria-label="Позвонить по номеру +7 929 012-38-48"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    Позвонить сейчас
                                </a>
                                <a
                                    href="https://wa.me/79290123848"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors"
                                    aria-label="Написать в WhatsApp"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.703"/>
                                    </svg>
                                    WhatsApp
                                </a>
                                <a
                                    href="https://t.me/kodex_kvo"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl transition-colors"
                                    aria-label="Написать в Telegram"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.121.099.155.232.171.326.016.093.036.305.02.469z"/>
                                    </svg>
                                    Telegram
                                </a>
                            </div>

                            {/* Trust indicators */}
                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <div className="grid grid-cols-3 gap-6 text-center">
                                    <div>
                                        <div className="text-3xl font-bold text-blue-600 mb-1">300+</div>
                                        <div className="text-sm text-gray-600">выигранных дел</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-blue-600 mb-1">95%</div>
                                        <div className="text-sm text-gray-600">успешных решений</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-blue-600 mb-1">24/7</div>
                                        <div className="text-sm text-gray-600">доступность</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right column - 2/5 width with elevated form */}
                    <div className="lg:col-span-2">
                        <div className={`sticky top-8 transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                                {/* Form header */}
                                <div className="text-center mb-6">
                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-blue-600/30">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Бесплатная консультация</h3>
                                    <p className="text-sm text-gray-600">Опишите вашу ситуацию — юрист проконсультирует в течение часа</p>
                                </div>

                                    {success && (
                                        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
                                            <div className="flex items-center">
                                                <svg className="h-5 w-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <p className="text-sm text-green-800">
                                                    Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {error && (
                                        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                                            <div className="flex items-center">
                                                <svg className="h-5 w-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <p className="text-sm text-red-800">{error}</p>
                                            </div>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Ваше имя *</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Иван Иванов"
                                                value={formData.name}
                                                onChange={handleChange}
                                                name="name"
                                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                                            />
                                        </div>
                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Номер телефона *</label>
                                            <input
                                                type="tel"
                                                required
                                                placeholder="+7 (___) ___-__-__"
                                                value={formData.phone}
                                                onChange={handlePhoneChange}
                                                onFocus={handlePhoneFocus}
                                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                                            />
                                        </div>
                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Опишите вашу ситуацию</label>
                                            <textarea
                                                placeholder="Кратко опишите вашу проблему или вопрос"
                                                rows="3"
                                                value={formData.message}
                                                onChange={handleChange}
                                                name="message"
                                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-sm sm:text-base"
                                            ></textarea>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5 mt-0.5">
                                                <input
                                                    type="checkbox"
                                                    required
                                                    checked={formData.agreement}
                                                    onChange={handleChange}
                                                    name="agreement"
                                                    id="agreement"
                                                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded cursor-pointer"
                                                />
                                            </div>
                                            <div className="ml-3 text-xs sm:text-sm">
                                                <label htmlFor="agreement" className="text-gray-600 cursor-pointer">
                                                    Согласен на обработку <a href="/privacy" className="text-blue-600 underline hover:text-blue-700">персональных данных</a>
                                                </label>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 sm:py-4 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 shadow-md text-sm sm:text-base"
                                        >
                                            {loading ? (
                                                <div className="flex items-center justify-center">
                                                    <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Отправка...
                                                </div>
                                            ) : (
                                                    'Заказать звонок'
                                                )}
                                            </button>
                                        </form>

                                        {/* Trust badge */}
                                        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                                            <p className="text-xs text-gray-500">
                                                <svg className="w-4 h-4 inline mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                </svg>
                                                Конфиденциальность гарантирована
                                            </p>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    );
};

export default Hero;
