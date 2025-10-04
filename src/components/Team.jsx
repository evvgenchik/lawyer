const Team = () => {
    const teamMembers = [
        {
            name: 'Коротеев Владислав Олегович',
            education: 'По жизни здравый пацан, юрист по образованию',
            specialization: 'Самый большой начальник в этой фирме',
            image: '/images/vladik2.PNG'
        }
        // {
        //     name: 'Коротеев Владислав Олегович',
        //     education: 'Учился в Саратовской государственной юридической академии (Институт прокуратуры РФ)',
        //     specialization: 'Военное право, страховые выплаты',
        //     image: 'https://via.placeholder.com/300x300/3B82F6/FFFFFF?text=В.О.'
        // }
        // {
        //     name: 'Двуреченский Леонид Андреевич',
        //     education: 'Учился в РАНХиГС в Липецком филиале. ЛГТУ магистр юриспруденция. Уголовно-правовой профиль',
        //     specialization: 'Уголовное право, защита прав военнослужащих',
        //     image: 'https://via.placeholder.com/300x300/3B82F6/FFFFFF?text=Л.А.'
        // },
        // {
        //     name: 'Ворошилина Алина Игоревна',
        //     education: 'Окончила ФГБОУ ВО Елецкий государственный университет имени И. А. Бунина с отличием, магистр юриспруденции',
        //     specialization: 'Гражданское право, семейное право',
        //     image: 'https://via.placeholder.com/300x300/3B82F6/FFFFFF?text=А.И.'
        // }
    ];

    return (
        <section id="team" className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Наши специалисты
                    </h2>
                    <p className="mt-4 text-xl text-gray-600">
                        Опытные юристы с глубокими знаниями военного права
                    </p>
                </div>

                <div className="mt-12">
                    {/* <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3"> */}
                    <div className="flex justify-center">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="text-center">
                                <div className="space-y-4">
                                    <img className="mx-auto h-80 w-80 rounded-full xl:w-56 xl:h-56 object-fill" src={member.image} alt={member.name} />
                                    <div className="space-y-2">
                                        <div className="text-lg leading-6 font-medium space-y-1">
                                            <h3 className="text-gray-900 text-xl font-bold">{member.name}</h3>
                                            <p className="text-primary-600 font-semibold">{member.specialization}</p>
                                        </div>
                                        <div className="text-lg">
                                            <p className="text-gray-500 text-sm leading-relaxed">{member.education}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            Какая помощь вам нужна?
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex flex-col items-center p-6 bg-primary-50 rounded-lg">
                                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold mb-2">Бесплатно проконсультируем</h4>
                                <p className="text-gray-600 text-center">лично или по телефону</p>
                            </div>

                            <div className="flex flex-col items-center p-6 bg-primary-50 rounded-lg">
                                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold mb-2">Уточним детали</h4>
                                <p className="text-gray-600 text-center">и оценим перспективу дела</p>
                            </div>

                            <div className="flex flex-col items-center p-6 bg-primary-50 rounded-lg">
                                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold mb-2">Добьемся результата</h4>
                                <p className="text-gray-600 text-center">необходимого для вас</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Team;
