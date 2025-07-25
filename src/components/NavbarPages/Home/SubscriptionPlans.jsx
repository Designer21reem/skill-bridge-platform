import React, { useState } from 'react';
import { FiCheck, FiX, FiArrowRight } from 'react-icons/fi';

const SubscriptionPlans = () => {
  const [activeTab, setActiveTab] = useState('monthly');
  
  const plans = {
    monthly: [
      {
        name: 'Basic',
        price: '$12',
        period: '/month',
        features: [
          { text: 'Access to 90+ courses', available: true },
          { text: 'Basic course material', available: true },
          { text: 'Course completion certificates', available: true },
          { text: '24/7 customer support', available: true },
          { text: 'Live Q&A session', available: false },
          { text: 'Download resources', available: false },
          { text: '1-on-1 coaching session', available: false }
        ],
        buttonText: 'Get Started',
        popular: false
      },
      {
        name: 'Standard',
        price: '$40',
        period: '/month',
        features: [
          { text: 'Access to 90+ courses', available: true },
          { text: 'Basic course material', available: true },
          { text: 'Course completion certificates', available: true },
          { text: '24/7 customer support', available: true },
          { text: 'Live Q&A session', available: true },
          { text: 'Download resources', available: false },
          { text: '1-on-1 coaching session', available: false }
        ],
        buttonText: 'Get Started',
        popular: true
      },
      {
        name: 'Premium',
        price: '$75',
        period: '/month',
        features: [
          { text: 'Access to 90+ courses', available: true },
          { text: 'Basic course material', available: true },
          { text: 'Course completion certificates', available: true },
          { text: '24/7 customer support', available: true },
          { text: 'Live Q&A session', available: true },
          { text: 'Download resources', available: true },
          { text: '1-on-1 coaching session', available: true }
        ],
        buttonText: 'Get Started',
        popular: false
      }
    ],
    yearly: [
      {
        name: 'Basic',
        price: '$120',
        period: '/year',
        discount: 'Save 20%',
        features: [
          { text: 'Access to 90+ courses', available: true },
          { text: 'Basic course material', available: true },
          { text: 'Course completion certificates', available: true },
          { text: '24/7 customer support', available: true },
          { text: 'Live Q&A session', available: false },
          { text: 'Download resources', available: false },
          { text: '1-on-1 coaching session', available: false }
        ],
        buttonText: 'Get Started',
        popular: false
      },
      {
        name: 'Standard',
        price: '$384',
        period: '/year',
        discount: 'Save 20%',
        features: [
          { text: 'Access to 90+ courses', available: true },
          { text: 'Basic course material', available: true },
          { text: 'Course completion certificates', available: true },
          { text: '24/7 customer support', available: true },
          { text: 'Live Q&A session', available: true },
          { text: 'Download resources', available: false },
          { text: '1-on-1 coaching session', available: false }
        ],
        buttonText: 'Get Started',
        popular: true
      },
      {
        name: 'Premium',
        price: '$720',
        period: '/year',
        discount: 'Save 20%',
        features: [
          { text: 'Access to 90+ courses', available: true },
          { text: 'Basic course material', available: true },
          { text: 'Course completion certificates', available: true },
          { text: '24/7 customer support', available: true },
          { text: 'Live Q&A session', available: true },
          { text: 'Download resources', available: true },
          { text: '1-on-1 coaching session', available: true }
        ],
        buttonText: 'Get Started',
        popular: false
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 mt-[173px] md:mt-[673px]">
        <div className="flex flex-col text-center mb-12 md:w-[700px] mx-auto">
          <h1 className='text-[30px] md:text-[50px] font-bold font-["Abhaya+Libre"]'>Flexible Purchasing Modal</h1>
          <p className='text-gray-600 text-center  text-[20px] font-[Murecho]'>Explore our flexible subscription plans tailored to fit your learned goals and budget.
            Whether you’re just getting started or looking to advance ,there’s a plan for you.</p>
        </div>
    
      {/* شريط التبويب */}
      <div className="flex justify-center mb-12">
        <div className="bg-gray-100 rounded-full p-1 inline-flex">
          <button
            onClick={() => setActiveTab('monthly')}
            className={`px-6 py-2 rounded-full font-medium ${
              activeTab === 'monthly' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setActiveTab('yearly')}
            className={`px-6 py-2 rounded-full font-medium ${
              activeTab === 'yearly' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600'
            }`}
          >
            Yearly <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full ml-1">-20%</span>
          </button>
        </div>
      </div>

      {/* بطاقات الخطط */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans[activeTab].map((plan, index) => (
          <div 
            key={index} 
            className={`relative rounded-xl border-2 p-6 ${
              plan.popular 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 bg-white'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </div>
            )}
            
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            
            <div className="mb-6">
              <span className="text-3xl font-bold">{plan.price}</span>
              <span className="text-gray-500">{plan.period}</span>
              {plan.discount && (
                <span className="ml-2 text-sm bg-green-100 text-green-600 px-2 py-1 rounded">
                  {plan.discount}
                </span>
              )}
            </div>
            
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  {feature.available ? (
                    <FiCheck className="text-green-500 mr-2" />
                  ) : (
                    <FiX className="text-gray-300 mr-2" />
                  )}
                  <span className={feature.available ? 'text-gray-800' : 'text-gray-400'}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
            
            <button 
              className={`w-full py-3 px-4 rounded-lg font-bold flex items-center justify-center ${
                plan.popular
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              {plan.buttonText}
              <FiArrowRight className="ml-2" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;