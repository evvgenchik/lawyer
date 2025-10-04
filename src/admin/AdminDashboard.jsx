import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [consultations, setConsultations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, new, in_progress, completed
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedConsultation, setSelectedConsultation] = useState(null);
    const navigate = useNavigate();

    const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            navigate('/admin');
        }
    };

    const fetchConsultations = async () => {
        try {
            const { data, error } = await supabase
                .from('consultations')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setConsultations(data || []);
        } catch (error) {
            console.error('Error fetching consultations:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkUser();
        fetchConsultations();

        // Subscribe to real-time updates
        const subscription = supabase
            .channel('consultations')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'consultations' }, () => {
                fetchConsultations();
            })
            .subscribe();

        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && selectedConsultation) {
                setSelectedConsultation(null);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            subscription.unsubscribe();
            document.removeEventListener('keydown', handleKeyDown);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedConsultation]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin');
    };

    const updateStatus = async (id, newStatus) => {
        try {
            const { error } = await supabase
                .from('consultations')
                .update({ status: newStatus, updated_at: new Date().toISOString() })
                .eq('id', id);

            if (error) throw error;
            fetchConsultations();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const deleteConsultation = async (id) => {
        if (!window.confirm('Вы уверены, что хотите удалить эту заявку? Это действие нельзя отменить.')) {
            return;
        }

        try {
            const { error } = await supabase
                .from('consultations')
                .delete()
                .eq('id', id);

            if (error) throw error;

            fetchConsultations();
            setSelectedConsultation(null); // Close modal if open
        } catch (error) {
            console.error('Error deleting consultation:', error);
            alert('Ошибка при удалении заявки. Попробуйте еще раз.');
        }
    };

    const filteredConsultations = consultations.filter(consultation => {
        const matchesFilter = filter === 'all' || consultation.status === filter;
        const matchesSearch = 
            consultation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            consultation.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            consultation.phone?.includes(searchTerm);
        return matchesFilter && matchesSearch;
    });

    const stats = {
        total: consultations.length,
        new: consultations.filter(c => c.status === 'new').length,
        in_progress: consultations.filter(c => c.status === 'in_progress').length,
        completed: consultations.filter(c => c.status === 'completed').length,
    };

    const getStatusBadge = (status) => {
        const badges = {
            new: 'bg-blue-100 text-blue-800',
            in_progress: 'bg-yellow-100 text-yellow-800',
            completed: 'bg-green-100 text-green-800',
        };
        const labels = {
            new: 'Новая',
            in_progress: 'В работе',
            completed: 'Завершена',
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${badges[status]}`}>
                {labels[status]}
            </span>
        );
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Загрузка...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-gray-900">Панель управления</h1>
                            <span className="ml-3 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                Администратор
                            </span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <a
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                            <button
                                onClick={handleLogout}
                                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Выйти
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Всего заявок</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
                            </div>
                            <div className="bg-blue-100 rounded-full p-3">
                                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Новые</p>
                                <p className="text-3xl font-bold text-blue-600 mt-1">{stats.new}</p>
                            </div>
                            <div className="bg-blue-100 rounded-full p-3">
                                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">В работе</p>
                                <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.in_progress}</p>
                            </div>
                            <div className="bg-yellow-100 rounded-full p-3">
                                <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Завершено</p>
                                <p className="text-3xl font-bold text-green-600 mt-1">{stats.completed}</p>
                            </div>
                            <div className="bg-green-100 rounded-full p-3">
                                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-lg shadow mb-6 p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    filter === 'all'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Все
                            </button>
                            <button
                                onClick={() => setFilter('new')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    filter === 'new'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Новые
                            </button>
                            <button
                                onClick={() => setFilter('in_progress')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    filter === 'in_progress'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                В работе
                            </button>
                            <button
                                onClick={() => setFilter('completed')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    filter === 'completed'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Завершено
                            </button>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Поиск по имени, email, телефону..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-80"
                            />
                            <svg className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Consultations List */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    {filteredConsultations.length === 0 ? (
                        <div className="text-center py-12">
                            <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <p className="text-gray-600">Заявки не найдены</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Клиент
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Контакты
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Услуга
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Дата
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Статус
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Действия
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredConsultations.map((consultation) => (
                                        <tr key={consultation.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">{consultation.name}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">{consultation.phone}</div>
                                                <div className="text-sm text-gray-500">{consultation.email}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">{consultation.service_type || 'Общая консультация'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(consultation.created_at)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(consultation.status)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className="flex items-center space-x-5">
                                                    <button
                                                        onClick={() => setSelectedConsultation(consultation)}
                                                        className="text-blue-600 hover:text-blue-800 transition-colors"
                                                        title="Просмотреть"
                                                    >
                                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => deleteConsultation(consultation.id)}
                                                        className="text-red-600 hover:text-red-800 transition-colors"
                                                        title="Удалить"
                                                    >
                                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                    {consultation.status !== 'completed' && (
                                                        <select
                                                            value={consultation.status}
                                                            onChange={(e) => updateStatus(consultation.id, e.target.value)}
                                                            className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        >
                                                            <option value="new">Новая</option>
                                                            <option value="in_progress">В работе</option>
                                                            <option value="completed">Завершена</option>
                                                        </select>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Detail Modal */}
            {selectedConsultation && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                    onClick={() => setSelectedConsultation(null)}
                >
                    <div 
                        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">Детали заявки</h3>
                                    <p className="text-sm text-gray-500 mt-1">ID: {selectedConsultation.id}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedConsultation(null)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Имя клиента</label>
                                    <p className="text-gray-900">{selectedConsultation.name}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                                        <a href={`tel:${selectedConsultation.phone}`} className="text-blue-600 hover:text-blue-800">
                                            {selectedConsultation.phone}
                                        </a>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <a href={`mailto:${selectedConsultation.email}`} className="text-blue-600 hover:text-blue-800">
                                            {selectedConsultation.email}
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Тип услуги</label>
                                    <p className="text-gray-900">{selectedConsultation.service_type || 'Не указано'}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Сообщение</label>
                                    <p className="text-gray-900 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                                        {selectedConsultation.message || 'Нет сообщения'}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Дата создания</label>
                                        <p className="text-gray-900">{formatDate(selectedConsultation.created_at)}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
                                        <div>{getStatusBadge(selectedConsultation.status)}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-between">
                                <button
                                    onClick={() => deleteConsultation(selectedConsultation.id)}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Удалить заявку
                                </button>

                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => setSelectedConsultation(null)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Закрыть
                                    </button>
                                    {selectedConsultation.status !== 'completed' && (
                                        <button
                                            onClick={() => {
                                                updateStatus(selectedConsultation.id, 'completed');
                                                setSelectedConsultation(null);
                                            }}
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            Отметить как завершено
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
