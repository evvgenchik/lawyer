import { useState, useEffect } from 'react';

import { supabase } from '../supabaseClient';

const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeFeature, setActiveFeature] = useState(0);

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
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % 4);
        }, 3000);
        return () => clearInterval(interval);
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

        // Ensure +7 prefix is always there
        if (!value.startsWith('+7')) {
            value = '+7' + value.replace(/^\+7/, '');
        }

        // Remove all non-digit characters except +
        const digitsOnly = value.replace(/[^\d+]/g, '');

        // Format as +7 (XXX) XXX-XX-XX
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
        // Remove formatting for validation
        const cleanPhone = phone.replace(/[^\d]/g, '');
        // Check if it's +7 followed by 10 digits
        return cleanPhone.length === 11 && cleanPhone.startsWith('7');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate phone number
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

            console.log(error);
            

            setSuccess(true);
            setFormData({
                name: '',
                phone: '',
                email: '',
                message: '',
                agreement: false
            });

            // Hide success message after 5 seconds
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
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-gradient-x"></div>
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                    <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                        <h1 className={`text-4xl tracking-tight font-extrabold sm:text-5xl md:text-7xl transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            {/* <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent animate-pulse">
                                Юридическая помощь
                            </span>
                            <span className="block text-blue-200 mt-2 text-3xl sm:text-4xl md:text-5xl">
                                военнослужащим, мобилизованным
                            </span>
                            <span className="block text-blue-300 mt-1 text-3xl sm:text-4xl md:text-5xl">
                                и добровольцам в <span className="text-yellow-300 font-black">Липецке</span>
                            </span> */}
                            <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent animate-pulse">
                                Юридическая помощь от Владика
                            </span>
                            <span className="block text-blue-200 mt-2 text-3xl sm:text-4xl md:text-5xl">
                                распетляем любой вопрос в этом городе
                            </span>
                            <span className="block text-blue-300 mt-1 text-3xl sm:text-4xl md:text-5xl">
                                за ваше лаве <span className="text-green-300 font-black">$</span>
                            </span>
                        </h1>

                        <div className={`mt-10 space-y-6 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            {[
                                { text: 'Первая консультация бесплатно', icon: '💬' },
                                { text: 'Получили >300 млн. ₽ страховых выплат по ранению для клиентов', icon: '💰' },
                                { text: 'Вернули более 100 мобилизованных с боевых действий', icon: '🛡️' },
                                { text: 'Работаем дистанционно по всей России', icon: '🌍' }
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center p-4 rounded-xl transition-all duration-500 ${
                                        activeFeature === index
                                            ? 'bg-white/20 backdrop-blur-sm border border-white/30 scale-105 shadow-2xl'
                                            : 'bg-white/5 backdrop-blur-sm border border-white/10'
                                    }`}
                                >
                                    <div className="flex-shrink-0 text-2xl mr-4">
                                        {feature.icon}
                                    </div>
                                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="ml-4 text-lg text-blue-100 font-medium">{feature.text}</p>
                                </div>
                            ))}
                        </div>

                        <div className={`mt-12 sm:flex sm:justify-center lg:justify-start transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <div className="group">
                                <a
                                    href="#consultation"
                                    className="relative overflow-hidden flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 md:px-12 md:py-5 md:text-xl"
                                >
                                    <span className="relative z-10 flex items-center">
                                        <span className="mr-3">⚡</span>
                                        ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ ЮРИСТА - БЕСПЛАТНО
                                        <span className="ml-3">→</span>
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className={`mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center transition-all duration-1000 delay-700 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                        <div className="relative mx-auto w-full lg:max-w-md">
                            {/* Glassmorphism form */}
                            <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 hover:bg-white/15 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold text-white mb-2">� Бесплатная консультация</h3>
                                    <p className="text-blue-200 mb-6">Получите профессиональную помощь уже сегодня</p>

                                    {success && (
                                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
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
                                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                            <div className="flex items-center">
                                                <svg className="h-5 w-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <p className="text-sm text-red-800">{error}</p>
                                            </div>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                required
                                                placeholder="Ваше имя"
                                                value={formData.name}
                                                onChange={handleChange}
                                                name="name"
                                                className="w-full px-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                                            />
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                required
                                                placeholder="Номер телефона"
                                                value={formData.phone}
                                                onChange={handlePhoneChange}
                                                onFocus={handlePhoneFocus}
                                                className="w-full px-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                                            />
                                        </div>
                                        <div className="relative">
                                            <textarea
                                                placeholder="Опишите вашу ситуацию"
                                                rows="3"
                                                value={formData.message}
                                                onChange={handleChange}
                                                name="message"
                                                className="w-full px-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                                            ></textarea>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5 mt-1">
                                                <input
                                                    type="checkbox"
                                                    required
                                                    checked={formData.agreement}
                                                    onChange={handleChange}
                                                    name="agreement"
                                                    className="focus:ring-yellow-400 h-4 w-4 text-yellow-400 bg-white/20 border-white/30 rounded cursor-pointer"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="agreement"  className="text-blue-200">
                                                    Согласен на обработку <a href="/privacy" className="text-yellow-300 underline hover:text-yellow-200">персональных данных</a>
                                                </label>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-4 rounded-xl font-bold hover:from-yellow-500 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
                                        >
                                            {loading ? (
                                                <div className="flex items-center justify-center">
                                                    <svg className="animate-spin h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Отправка...
                                                </div>
                                            ) : (
                                                '🚀 Получить консультацию сейчас'
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
