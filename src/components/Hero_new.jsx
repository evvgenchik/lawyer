import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
        agreement: false,
        policy: false
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [showPrivacyPopup, setShowPrivacyPopup] = useState(false);
    const [showPolicyPopup, setShowPolicyPopup] = useState(false);

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
                agreement: false,
                policy: false
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
                                            <div className="flex gap-2">
                                                <a 
                                                    href="https://t.me/+4S3e7LVs7DUzYTRi" 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center gap-2 px-3 py-1 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-lg transition-colors"
                                                >
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.121.099.155.232.171.326.016.093.036.305.02.469z"/>
                                                    </svg>
                                                    Telegram канал 
                                                </a>
                                                <a
                                                    href="https://max.ru/join/iUOcXSQI8O4Tb3w_gVJ4CO5Um6VbRjvppF99jpsznkg"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center gap-2 px-3 py-1 bg-[#708FE9] hover:bg-[#9164DE] text-white text-sm font-semibold rounded-lg transition-colors"
                                                >
                                                    <img src="/images/max.svg" alt="MAX" className="w-4 h-4" />
                                                    MAX канал
                                                </a>
                                            </div>
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
                                <a
                                    href="https://max.ru/u/f9LHodD0cOKcBw19oDA03n27PHhQ-3-l37vRpaCdykDZoOq23T0BDP0lQq0"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-[#708FE9] hover:bg-[#9164DE] text-white font-semibold rounded-xl transition-colors"
                                    aria-label="Написать в MAX"
                                >
                                    <img src="/images/max.svg" alt="MAX" className="w-5 h-5 mr-2" />
                                    MAX
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
                                                    Согласен на обработку <button type="button" onClick={() => setShowPrivacyPopup(true)} className="text-blue-600 underline hover:text-blue-700">персональных данных</button>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5 mt-0.5">
                                                <input
                                                    type="checkbox"
                                                    required
                                                    checked={formData.policy}
                                                    onChange={handleChange}
                                                    name="policy"
                                                    id="policy"
                                                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded cursor-pointer"
                                                />
                                            </div>
                                            <div className="ml-3 text-xs sm:text-sm">
                                                <label htmlFor="policy" className="text-gray-600 cursor-pointer">
                                                    Ознакомлен с <button type="button" onClick={() => setShowPolicyPopup(true)} className="text-blue-600 underline hover:text-blue-700">политикой конфиденциальности</button>
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
        {showPrivacyPopup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowPrivacyPopup(false)}>
                <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between p-5 border-b border-gray-100">
                        <h3 className="text-base font-semibold text-gray-800">Согласие на обработку персональных данных</h3>
                        <button type="button" onClick={() => setShowPrivacyPopup(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="overflow-y-auto p-5 text-sm text-gray-600 space-y-3 leading-relaxed">
                        <p>1. Настоящее согласие на обработку персональных данных (далее по тексту Согласие), выражает волю пользователя информационно-телекоммуникационной сети «Интернет», (далее по тексту Пользователь) передающего свои персональные данные через сайт расположенном по адресу kodex48.ru (далее по тексту Сайт) ИП «Коротеев Владислав Олегович» (ОГРНИП: 326480000001925, ИНН: 480707744630; тел: +7 929-012-38-48) (далее по тексту Оператор).</p>
                        <p>2. В соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» Пользователь дает Исполнителю конкретное, предметное, информированное, сознательное и однозначное согласие на обработку своих персональных данных с целью: обработки заявки Пользователя по предоставление услуг, оказываемых Оператором; обеспечения связи Оператора с Пользователем; иных целях, непосредственно связанных с обработкой заявки Пользователя на Сайте Оператора и/или оказания услуг Пользователю в связи с оставленной заявкой.</p>
                        <p>3. Пользователь дает Исполнителю согласие на обработку следующих персональных данных:</p>
                        <ul className="list-disc list-inside space-y-1 pl-2">
                            <li>фамилия, имя, отчество;</li>
                            <li>номер телефона;</li>
                            <li>сведения, собираемые посредством метрических программ.</li>
                        </ul>
                        <p>4. Пользователь разрешает Исполнителю производить автоматизированную, а также осуществляемую без использования средств автоматизации обработку персональных данных, в том числе:</p>
                        <ul className="list-disc list-inside space-y-1 pl-2">
                            <li>сбор;</li>
                            <li>запись;</li>
                            <li>систематизацию;</li>
                            <li>накопление;</li>
                            <li>хранение;</li>
                            <li>уточнение (обновление, изменение);</li>
                            <li>извлечение;</li>
                            <li>использование;</li>
                            <li>блокирование;</li>
                            <li>удаление;</li>
                            <li>уничтожение.</li>
                        </ul>
                        <p>5. Согласие действует с даты его предоставления, до момента достижения цели обработки персональных данных. Пользователь вправе отозвать Согласие на обработку персональных данных, письменно уведомив об этом Оператора.</p>
                    </div>
                    <div className="p-5 border-t border-gray-100">
                        <button type="button" onClick={() => setShowPrivacyPopup(false)} className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors">
                            Понятно
                        </button>
                    </div>
                </div>
            </div>
        )}
        {showPolicyPopup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowPolicyPopup(false)}>
                <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between p-5 border-b border-gray-100">
                        <h3 className="text-base font-semibold text-gray-800">Политика конфиденциальности</h3>
                        <button type="button" onClick={() => setShowPolicyPopup(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="overflow-y-auto p-5 text-sm text-gray-600 space-y-3 leading-relaxed">
                        <p className="font-semibold text-gray-800">1. Общие положения</p>
                        <p>Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. № 152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые ИП Коротеев Владислав Олегович (далее — Оператор).</p>
                        <p>1.1. Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.</p>
                        <p>1.2. Настоящая политика Оператора в отношении обработки персональных данных (далее — Политика) применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта https://kodex48.ru/</p>
                        <p className="font-semibold text-gray-800">2. Основные понятия, используемые в Политике</p>
                        <p>2.1. Автоматизированная обработка персональных данных — обработка персональных данных с помощью средств вычислительной техники.</p>
                        <p>2.2. Блокирование персональных данных — временное прекращение обработки персональных данных (за исключением случаев, если обработка необходима для уточнения персональных данных).</p>
                        <p>2.3. Веб-сайт — совокупность графических и информационных материалов, а также программ для ЭВМ и баз данных, обеспечивающих их доступность в сети интернет по сетевому адресу https://kodex48.ru/</p>
                        <p>2.4. Информационная система персональных данных — совокупность содержащихся в базах данных персональных данных и обеспечивающих их обработку информационных технологий и технических средств.</p>
                        <p>2.5. Обезличивание персональных данных — действия, в результате которых невозможно определить без использования дополнительной информации принадлежность персональных данных конкретному Пользователю или иному субъекту персональных данных.</p>
                        <p>2.6. Обработка персональных данных — любое действие (операция) или совокупность действий (операций), совершаемых с использованием средств автоматизации или без использования таких средств с персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных.</p>
                        <p>2.7. Оператор — государственный орган, муниципальный орган, юридическое или физическое лицо, самостоятельно или совместно с другими лицами организующие и/или осуществляющие обработку персональных данных, а также определяющие цели обработки персональных данных, состав персональных данных, подлежащих обработке, действия (операции), совершаемые с персональными данными.</p>
                        <p>2.8. Персональные данные — любая информация, относящаяся прямо или косвенно к определенному или определяемому Пользователю веб-сайта https://kodex48.ru/</p>
                        <p>2.10. Пользователь — любой посетитель веб-сайта https://kodex48.ru/</p>
                        <p>2.11. Предоставление персональных данных — действия, направленные на раскрытие персональных данных определенному лицу или определенному кругу лиц.</p>
                        <p>2.12. Распространение персональных данных — любые действия, направленные на раскрытие персональных данных неопределенному кругу лиц или на ознакомление с персональными данными неограниченного круга лиц, в том числе обнародование персональных данных в средствах массовой информации, размещение в информационно-телекоммуникационных сетях или предоставление доступа к персональным данным каким-либо иным способом.</p>
                        <p>2.13. Трансграничная передача персональных данных — передача персональных данных на территорию иностранного государства органу власти иностранного государства, иностранному физическому или иностранному юридическому лицу.</p>
                        <p>2.14. Уничтожение персональных данных — любые действия, в результате которых персональные данные уничтожаются безвозвратно с невозможностью дальнейшего восстановления содержания персональных данных в информационной системе персональных данных и/или уничтожаются материальные носители персональных данных.</p>
                        <p className="font-semibold text-gray-800">3. Основные права и обязанности Оператора</p>
                        <p>3.1. Оператор имеет право: получать от субъекта персональных данных достоверные информацию и/или документы, содержащие персональные данные; в случае отзыва субъектом персональных данных согласия на обработку персональных данных, Оператор вправе продолжить обработку персональных данных без согласия субъекта персональных данных при наличии оснований, указанных в Законе о персональных данных; самостоятельно определять состав и перечень мер, необходимых и достаточных для обеспечения выполнения обязанностей, предусмотренных Законом о персональных данных.</p>
                        <p>3.2. Оператор обязан: предоставлять субъекту персональных данных по его просьбе информацию, касающуюся обработки его персональных данных; организовывать обработку персональных данных в порядке, установленном действующим законодательством РФ; отвечать на обращения и запросы субъектов персональных данных и их законных представителей; сообщать в уполномоченный орган по защите прав субъектов персональных данных по запросу этого органа необходимую информацию в течение 10 дней; публиковать или иным образом обеспечивать неограниченный доступ к настоящей Политике; принимать правовые, организационные и технические меры для защиты персональных данных.</p>
                        <p className="font-semibold text-gray-800">4. Основные права и обязанности субъектов персональных данных</p>
                        <p>4.1. Субъекты персональных данных имеют право: получать информацию, касающуюся обработки его персональных данных; требовать от оператора уточнения его персональных данных, их блокирования или уничтожения в случае, если персональные данные являются неполными, устаревшими, неточными или незаконно полученными; на отзыв согласия на обработку персональных данных; обжаловать в уполномоченный орган по защите прав субъектов персональных данных или в судебном порядке неправомерные действия или бездействие Оператора.</p>
                        <p>4.2. Субъекты персональных данных обязаны: предоставлять Оператору достоверные данные о себе; сообщать Оператору об уточнении (обновлении, изменении) своих персональных данных.</p>
                        <p>4.3. Лица, передавшие Оператору недостоверные сведения о себе, либо сведения о другом субъекте персональных данных без согласия последнего, несут ответственность в соответствии с законодательством РФ.</p>
                        <p className="font-semibold text-gray-800">5. Принципы обработки персональных данных</p>
                        <p>5.1. Обработка персональных данных осуществляется на законной и справедливой основе.</p>
                        <p>5.2. Обработка персональных данных ограничивается достижением конкретных, заранее определенных и законных целей. Не допускается обработка персональных данных, несовместимая с целями сбора персональных данных.</p>
                        <p>5.3. Не допускается объединение баз данных, содержащих персональные данные, обработка которых осуществляется в целях, несовместимых между собой.</p>
                        <p>5.4. Обработке подлежат только персональные данные, которые отвечают целям их обработки.</p>
                        <p>5.5. Содержание и объем обрабатываемых персональных данных соответствуют заявленным целям обработки. Не допускается избыточность обрабатываемых персональных данных по отношению к заявленным целям их обработки.</p>
                        <p>5.6. При обработке персональных данных обеспечивается точность персональных данных, их достаточность, а в необходимых случаях и актуальность по отношению к целям обработки персональных данных.</p>
                        <p>5.7. Хранение персональных данных осуществляется в форме, позволяющей определить субъекта персональных данных, не дольше, чем этого требуют цели обработки персональных данных.</p>
                        <p className="font-semibold text-gray-800">6. Цели обработки персональных данных</p>
                        <p>Цель обработки: предоставление доступа Пользователю к сервисам, информации и/или материалам, содержащимся на веб-сайте. Персональные данные: номера телефонов, имя, город. Правовые основания: Федеральный закон «Об информации, информационных технологиях и о защите информации» от 27.07.2006 N 149-ФЗ. Виды обработки: передача персональных данных.</p>
                        <p className="font-semibold text-gray-800">7. Условия обработки персональных данных</p>
                        <p>7.1. Обработка персональных данных осуществляется с согласия субъекта персональных данных на обработку его персональных данных.</p>
                        <p>7.2–7.7. Обработка персональных данных осуществляется в случаях, предусмотренных действующим законодательством Российской Федерации, в том числе для исполнения договоров, осуществления правосудия, достижения общественно значимых целей, а также в отношении общедоступных персональных данных и данных, подлежащих обязательному раскрытию в соответствии с федеральным законом.</p>
                        <p className="font-semibold text-gray-800">8. Порядок сбора, хранения, передачи и других видов обработки персональных данных</p>
                        <p>8.1. Оператор обеспечивает сохранность персональных данных и принимает все возможные меры, исключающие доступ к персональным данным неуполномоченных лиц.</p>
                        <p>8.2. Персональные данные Пользователя никогда, ни при каких условиях не будут переданы третьим лицам, за исключением случаев, связанных с исполнением действующего законодательства либо в случае, если субъектом персональных данных дано согласие Оператору на передачу данных третьему лицу для исполнения обязательств по гражданско-правовому договору.</p>
                        <p>8.3. В случае выявления неточностей в персональных данных, Пользователь может актуализировать их самостоятельно, путем направления Оператору уведомление на адрес электронной почты Оператора kodex48@mail.ru с пометкой «Актуализация персональных данных».</p>
                        <p>8.4. Срок обработки персональных данных определяется достижением целей, для которых были собраны персональные данные. Пользователь может в любой момент отозвать свое согласие на обработку персональных данных, направив Оператору уведомление на электронный адрес kodex48@mail.ru с пометкой «Отзыв согласия на обработку персональных данных».</p>
                        <p>8.5. Вся информация, которая собирается сторонними сервисами, в том числе платежными системами, средствами связи и другими поставщиками услуг, хранится и обрабатывается указанными лицами в соответствии с их Пользовательским соглашением и Политикой конфиденциальности. Оператор не несет ответственность за действия третьих лиц.</p>
                        <p>8.7. Оператор при обработке персональных данных обеспечивает конфиденциальность персональных данных.</p>
                        <p>8.8. Оператор осуществляет хранение персональных данных в форме, позволяющей определить субъекта персональных данных, не дольше, чем этого требуют цели обработки персональных данных.</p>
                        <p>8.9. Условием прекращения обработки персональных данных может являться достижение целей обработки персональных данных, истечение срока действия согласия субъекта персональных данных, отзыв согласия субъектом персональных данных или требование о прекращении обработки персональных данных, а также выявление неправомерной обработки персональных данных.</p>
                        <p className="font-semibold text-gray-800">9. Перечень действий, производимых Оператором с полученными персональными данными</p>
                        <p>9.1. Оператор осуществляет сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление и уничтожение персональных данных.</p>
                        <p>9.2. Оператор осуществляет автоматизированную обработку персональных данных с получением и/или передачей полученной информации по информационно-телекоммуникационным сетям или без таковой.</p>
                        <p className="font-semibold text-gray-800">10. Трансграничная передача персональных данных</p>
                        <p>10.1. Оператор до начала осуществления деятельности по трансграничной передаче персональных данных обязан уведомить уполномоченный орган по защите прав субъектов персональных данных о своем намерении осуществлять трансграничную передачу персональных данных.</p>
                        <p>10.2. Оператор до подачи вышеуказанного уведомления обязан получить от органов власти иностранного государства, иностранных физических лиц, иностранных юридических лиц, которым планируется трансграничная передача персональных данных, соответствующие сведения.</p>
                        <p className="font-semibold text-gray-800">11. Конфиденциальность персональных данных</p>
                        <p>Оператор и иные лица, получившие доступ к персональным данным, обязаны не раскрывать третьим лицам и не распространять персональные данные без согласия субъекта персональных данных, если иное не предусмотрено федеральным законом.</p>
                        <p className="font-semibold text-gray-800">12. Заключительные положения</p>
                        <p>12.1. Пользователь может получить любые разъяснения по интересующим вопросам, касающимся обработки его персональных данных, обратившись к Оператору с помощью электронной почты kodex48@mail.ru</p>
                        <p>12.2. В данном документе будут отражены любые изменения политики обработки персональных данных Оператором. Политика действует бессрочно до замены ее новой версией.</p>
                        <p>12.3. Актуальная версия Политики в свободном доступе расположена в сети Интернет по адресу <a href="/#/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-700">https://kodex48.ru/privacy-policy</a></p>
                    </div>
                    <div className="p-5 border-t border-gray-100">
                        <button type="button" onClick={() => setShowPolicyPopup(false)} className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors">
                            Понятно
                        </button>
                    </div>
                </div>
            </div>
        )}
        </section>
    );
};

export default Hero;
