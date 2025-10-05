import { useState } from 'react';

import { supabase } from '../supabaseClient';

const ConsultationForm = () => {
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
        <section id="consultation" className="py-8 sm:py-12 lg:py-16 bg-primary-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
                    <div className="mb-6 sm:mb-8 lg:mb-0">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                            ОСТАЛИСЬ ВОПРОСЫ?
                        </h2>
                        <p className="mt-3 sm:mt-4 text-base sm:text-lg lg:text-xl text-primary-100">
                            Введите данные и юрист свяжется с вами
                        </p>

                        <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-6 w-6 sm:h-8 sm:w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div className="ml-3 sm:ml-4">
                                    <h3 className="text-base sm:text-lg font-medium text-white">Позвоните нам по телефону:</h3>
                                    <a href="tel:+74742200719" className="text-lg sm:text-2xl font-bold text-green-500 hover:text-white">
                                        +7 (474) 220-07-19
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-6 w-6 sm:h-8 sm:w-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.703"/>
                                    </svg>
                                </div>
                                <div className="ml-3 sm:ml-4">
                                    <a
                                        href="https://wa.me/79272588921"
                                        className="text-base sm:text-lg font-medium text-white hover:text-primary-200"
                                    >
                                        Написать в WhatsApp
                                    </a>
                                </div>
                            </div>

                            <div className="bg-primary-800 rounded-lg p-4 sm:p-6 mt-6 sm:mt-8">
                                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
                                    ПОЛУЧИТЕ БЕСПЛАТНО методичку для мобилизованных
                                </h3>
                                <p className="text-primary-200 mb-3 sm:mb-4 text-sm sm:text-base">
                                    от наших военных юристов в формате PDF
                                </p>
                                <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-md font-semibold transition duration-300 text-sm sm:text-base">
                                    Скачать методичку бесплатно
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 lg:p-8">
                        {success && (
                            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-center">
                                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-xs sm:text-sm text-green-800">
                                        Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
                                    </p>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                                <div className="flex items-center">
                                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-xs sm:text-sm text-red-800">{error}</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Ваше имя *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm sm:text-base"
                                    placeholder="Введите ваше имя"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Номер телефона *
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    onFocus={handlePhoneFocus}
                                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm sm:text-base"
                                    placeholder="+7 (___) ___-__-__"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email (необязательно)
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm sm:text-base"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Опишите вашу ситуацию
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="3"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm sm:text-base"
                                    placeholder="Расскажите о вашей ситуации..."
                                ></textarea>
                            </div>

                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="agreement"
                                        name="agreement"
                                        type="checkbox"
                                        required
                                        checked={formData.agreement}
                                        onChange={handleChange}
                                        className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded cursor-pointer"
                                    />
                                </div>
                                <div className="ml-3 text-xs sm:text-sm">
                                    <label htmlFor="agreement" className="text-gray-500">
                                        Согласен на обработку{' '}
                                        <a href="/privacy" className="text-primary-600 underline hover:text-primary-700">
                                            персональных данных
                                        </a>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Отправка...
                                    </div>
                                ) : (
                                    'Получить бесплатную консультацию'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConsultationForm;
