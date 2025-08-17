import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import AnimatedGradientText from '../common/AnimatedGradientText';

const UpgradeView = () => {
    const [billingCycle, setBillingCycle] = useState('monthly');
    
    const plans = {
        monthly: [
            { 
                name: 'Free', 
                price: '$0', 
                features: [
                    'Access to basic courses', 
                    'Limited practice quizzes', 
                    'Community support'
                ] 
            },
            { 
                name: 'Pro', 
                price: '$12', 
                features: [
                    'Access to all courses', 
                    'Unlimited practice quizzes', 
                    'AI-powered learning tools', 
                    'Course certificates', 
                    'Priority support'
                ], 
                popular: true 
            },
            { 
                name: 'Teams', 
                price: '$25', 
                features: [
                    'All Pro features', 
                    'Team management dashboard', 
                    'Usage analytics', 
                    'Dedicated account manager'
                ] 
            }
        ],
        yearly: [
            { 
                name: 'Free', 
                price: '$0', 
                features: [
                    'Access to basic courses', 
                    'Limited practice quizzes', 
                    'Community support'
                ] 
            },
            { 
                name: 'Pro', 
                price: '$9', 
                features: [
                    'Access to all courses', 
                    'Unlimited practice quizzes', 
                    'AI-powered learning tools', 
                    'Course certificates', 
                    'Priority support'
                ], 
                popular: true 
            },
            { 
                name: 'Teams', 
                price: '$20', 
                features: [
                    'All Pro features', 
                    'Team management dashboard', 
                    'Usage analytics', 
                    'Dedicated account manager'
                ] 
            }
        ]
    };

    return (
        <div className="animate-fade-in-up space-y-12 max-w-5xl mx-auto">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-2">
                    <AnimatedGradientText>Choose Your Plan</AnimatedGradientText>
                </h1>
                <p className="text-lg text-text-secondary">
                    Unlock your full potential with EduMaster Pro.
                </p>
                
                <div className="mt-6 flex justify-center">
                    <div className="relative flex items-center p-1 bg-input rounded-full">
                        <button 
                            onClick={() => setBillingCycle('monthly')} 
                            className={`px-6 py-2 text-sm font-semibold rounded-full z-10 transition-colors ${
                                billingCycle === 'monthly' ? 'text-primary' : 'text-text-secondary'
                            }`}
                        >
                            Monthly
                        </button>
                        <button 
                            onClick={() => setBillingCycle('yearly')} 
                            className={`px-6 py-2 text-sm font-semibold rounded-full z-10 transition-colors ${
                                billingCycle === 'yearly' ? 'text-primary' : 'text-text-secondary'
                            }`}
                        >
                            Yearly (Save 25%)
                        </button>
                        <div 
                            className={`absolute top-1 h-10 w-1/2 bg-card rounded-full shadow-md transition-transform duration-300 ease-in-out ${
                                billingCycle === 'monthly' ? 'translate-x-0' : 'translate-x-full'
                            }`} 
                            style={{width: 'calc(50% - 4px)', left: '2px'}}
                        ></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {plans[billingCycle].map(plan => (
                    <div 
                        key={plan.name} 
                        className={`bg-card rounded-2xl shadow-lg p-8 flex flex-col ${
                            plan.popular ? 'border-2 border-primary shadow-2xl' : ''
                        }`}
                    >
                        {plan.popular && (
                            <div className="text-center mb-4">
                                <span className="bg-primary-hover text-primary text-xs font-bold px-3 py-1 rounded-full">
                                    Most Popular
                                </span>
                            </div>
                        )}
                        
                        <h3 className="text-2xl font-bold text-text-primary text-center">
                            {plan.name}
                        </h3>
                        
                        <p className="text-center my-4">
                            <span className="text-4xl font-extrabold text-text-primary">
                                {plan.price}
                            </span>
                            <span className="text-text-secondary">/month</span>
                        </p>
                        
                        <button 
                            className={`w-full py-3 rounded-lg font-semibold ${
                                plan.name === 'Free' 
                                    ? 'bg-input text-text-primary' 
                                    : 'bg-primary text-white hover:bg-primary-hover'
                            }`}
                        >
                            {plan.name === 'Free' ? 'Current Plan' : 'Choose Plan'}
                        </button>
                        
                        <ul className="space-y-3 mt-8 flex-grow">
                            {plan.features.map(feature => (
                                <li key={feature} className="flex items-start gap-3">
                                    <CheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={18} />
                                    <span className="text-text-secondary">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpgradeView;