const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Политика конфиденциальности</h1>
      
      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold mb-4">1. Общие положения</h2>
        <p className="mb-4">
          Настоящая Политика конфиденциальности определяет порядок обработки персональных данных
          и меры по обеспечению безопасности персональных данных...
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">2. Цели обработки персональных данных</h2>
        <p className="mb-4">
          Персональные данные обрабатываются в следующих целях:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Предоставление юридических консультаций</li>
          <li>Связь с клиентами</li>
          <li>Выполнение договорных обязательств</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mb-4">3. Контактная информация</h2>
        <p className="mb-4">
          По всем вопросам, связанным с обработкой персональных данных, вы можете обращаться:
        </p>
        <p className="mb-2">Телефон: +7 (474) 220-07-19</p>
        <p className="mb-2">Email: lipetskcentrprava@gmail.com</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
