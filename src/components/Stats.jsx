import React from 'react';

const Stats = () => {
  const stats = [
    {
      number: '300+',
      label: 'млн. ₽ страховых выплат',
      description: 'получили для клиентов'
    },
    {
      number: '100+',
      label: 'мобилизованных',
      description: 'вернули с боевых действий'
    },
    {
      number: '5+',
      label: 'лет опыта',
      description: 'в военном праве'
    },
    {
      number: '24/7',
      label: 'поддержка',
      description: 'дистанционно по России'
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Наши результаты
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Мы помогаем военнослужащим получать справедливые выплаты и защищаем их права
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex flex-col bg-white rounded-lg shadow-lg p-6 h-full">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                    {stat.label}
                  </dt>
                  <dd className="order-1 text-4xl font-extrabold text-primary-600">
                    {stat.number}
                  </dd>
                  <dd className="order-3 mt-2 text-sm text-gray-400">
                    {stat.description}
                  </dd>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;