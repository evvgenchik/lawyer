const Team = () => {
    const teamMembers = [
        {
            name: 'Коротеев Владислав Олегович',
            education: 'Выпускник Саратовской государственной юридической академии',
            specialization: 'Управляющий партнёр, специалист по гражданскому и страховому праву',
            experience: '5+ лет практики',
            cases: '100+ успешных дел',
            image: '/images/vladik2.jpg'
        }
    ];

    return (
        <section id="team" className="py-8 sm:py-12 lg:py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
                    Лучшая команда юристов в Липецке
                </h2>
                <p className="mt-3 sm:mt-4 text-base sm:text-lg lg:text-xl text-gray-600">
                    Опытные юристы с глубокими знаниями во всех отраслях права
                </p>
            </div>                <div className="mt-12">
                    <div className="flex justify-center">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="max-w-2xl">
                                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                    <div className="md:flex">
                                        <div className="md:flex-shrink-0 flex justify-center items-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
                                            <img
                                                className="h-56 w-56 rounded-full object-fit border-4 border-white shadow-lg"
                                                src={member.image}
                                                alt={member.name}
                                            />
                                        </div>
                                        <div className="p-8">
                                            <div className="uppercase tracking-wide text-sm text-primary-600 font-semibold">
                                                {member.specialization}
                                            </div>
                                            <h3 className="mt-2 text-2xl leading-8 font-bold text-gray-900">
                                                {member.name}
                                            </h3>
                                            <p className="mt-3 text-base text-gray-600 leading-relaxed">
                                                {member.education}
                                            </p>
                                            <div className="mt-6 flex flex-wrap gap-4">
                                                <div className="flex items-center text-sm text-gray-700">
                                                    <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className="font-medium">{member.experience}</span>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-700">
                                                    <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className="font-medium">{member.cases}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* <div className="mt-12 sm:mt-16 bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
                    <div className="text-center">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                            Какая помощь вам нужна?
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                            <div className="flex flex-col items-center p-4 sm:p-6 bg-primary-50 rounded-lg">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-500 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <h4 className="text-base sm:text-lg font-semibold mb-2">Бесплатно проконсультируем</h4>
                                <p className="text-gray-600 text-center text-sm sm:text-base">лично или по телефону</p>
                            </div>

                            <div className="flex flex-col items-center p-4 sm:p-6 bg-primary-50 rounded-lg">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-500 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <h4 className="text-base sm:text-lg font-semibold mb-2">Уточним детали</h4>
                                <p className="text-gray-600 text-center text-sm sm:text-base">и оценим перспективу дела</p>
                            </div>

                            <div className="flex flex-col items-center p-4 sm:p-6 bg-primary-50 rounded-lg">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-500 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h4 className="text-base sm:text-lg font-semibold mb-2">Добьемся результата</h4>
                                <p className="text-gray-600 text-center text-sm sm:text-base">необходимого для вас</p>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </section>
    );
};

export default Team;
