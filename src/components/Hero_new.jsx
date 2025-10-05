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
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
            {/* Subtle background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                    {/* Left Content */}
                    <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                        <h1 className={`text-3xl sm:text-4xl lg:text-6xl tracking-tight font-bold transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <span className="block text-white">
                                Юридическая помощь
                            </span>
                            <span className="block text-blue-100 mt-3 text-xl sm:text-2xl lg:text-4xl font-normal">
                                военнослужащим и участникам СВО
                            </span>
                            <span className="block text-blue-200 mt-2 text-lg sm:text-xl lg:text-3xl font-normal">
                                в Липецке и по всей России
                            </span>
                        </h1>

                        {/* Features */}
                        <div className={`mt-6 sm:mt-8 space-y-3 sm:space-y-4 transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            {[
                                { text: 'Бесплатная первичная консультация' },
                                { text: 'Более 300 млн ₽ страховых выплат для клиентов' },
                                { text: 'Опыт защиты прав военнослужащих' },
                                { text: 'Работаем дистанционно по всей России' }
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 p-3 sm:p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-colors duration-300"
                                >
                                    <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 mt-0.5 bg-blue-500 rounded-full flex items-center justify-center">
                                        <svg className="h-3 w-3 sm:h-4 sm:w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-sm sm:text-base lg:text-lg text-blue-50 leading-relaxed">{feature.text}</p>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className={`mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <a
                                href="tel:+74742200719"
                                className="inline-flex grow items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-white/20 hover:bg-white/30  text-white font-semibold text-sm sm:text-base border border-white/30 rounded-lg transition-all duration-300"
                            >
                                <svg className="mr-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Позвонить сейчас
                            </a>
                        </div>
                    </div>

                    {/* Right Form */}
                    <div className={`mt-8 sm:mt-12 lg:mt-0 relative sm:max-w-lg sm:mx-auto lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center transition-all duration-700 delay-400 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                        <div className="relative mx-auto w-full lg:max-w-md">
                            <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8">
                                <div className="relative z-10">
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Бесплатная консультация</h3>
                                    <p className="text-gray-600 text-sm sm:text-base mb-6">Заполните форму, и мы свяжемся с вами в ближайшее время</p>

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
                                                'Получить консультацию'
                                            )}
                                        </button>
                                    </form>
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
