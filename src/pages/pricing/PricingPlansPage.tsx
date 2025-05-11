import React from 'react';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';

const PricingPlansPage: React.FC = () => {
  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      description: 'Perfect for getting started',
      features: [
        { name: '1 job posting', included: true },
        { name: 'Basic candidate search', included: true },
        { name: 'Standard support', included: true },
        { name: '30-day job listing', included: true },
        { name: 'Featured listings', included: false },
        { name: 'Advanced analytics', included: false },
        { name: 'Team collaboration', included: false },
        { name: 'Custom branding', included: false },
      ],
    },
    {
      name: 'Professional',
      price: '$99',
      period: '/month',
      description: 'Best for growing companies',
      popular: true,
      features: [
        { name: '5 job postings', included: true },
        { name: 'Advanced candidate search', included: true },
        { name: 'Priority support', included: true },
        { name: '60-day job listing', included: true },
        { name: 'Featured listings', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Team collaboration', included: false },
        { name: 'Custom branding', included: false },
      ],
    },
    {
      name: 'Enterprise',
      price: '$299',
      period: '/month',
      description: 'For large organizations',
      features: [
        { name: 'Unlimited job postings', included: true },
        { name: 'Advanced candidate search', included: true },
        { name: 'Dedicated account manager', included: true },
        { name: '90-day job listing', included: true },
        { name: 'Featured listings', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Team collaboration', included: true },
        { name: 'Custom branding', included: true },
      ],
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header section */}
      <section className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-200">
              Choose the plan that best fits your recruitment needs
            </p>
          </div>
        </div>
      </section>

      {/* Pricing plans */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-sm overflow-hidden ${
                  plan.popular ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="bg-primary-500 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-gray-500 ml-1">{plan.period}</span>
                    )}
                  </div>

                  <Link
                    to="/register"
                    className={`block w-full text-center py-2 px-4 rounded-md transition-colors ${
                      plan.popular
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </Link>

                  <div className="mt-8">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">
                      What's included:
                    </h4>
                    <ul className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start"
                        >
                          {feature.included ? (
                            <Check className="h-5 w-5 text-green-500 mr-2" />
                          ) : (
                            <X className="h-5 w-5 text-gray-300 mr-2" />
                          )}
                          <span className={feature.included ? 'text-gray-900' : 'text-gray-500'}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-8">
              {[
                {
                  q: "How do I upgrade my plan?",
                  a: "You can upgrade your plan at any time from your account settings. The new features will be available immediately, and we'll prorate your billing."
                },
                {
                  q: "Can I cancel my subscription?",
                  a: "Yes, you can cancel your subscription at any time. You'll continue to have access to your plan's features until the end of your current billing period."
                },
                {
                  q: "Do you offer custom plans?",
                  a: "Yes, we offer custom enterprise solutions for large organizations with specific needs. Contact our sales team to learn more."
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept all major credit cards, PayPal, and bank transfers for our premium plans."
                }
              ].map((faq, index) => (
                <div key={index}>
                  <h3 className="text-xl font-semibold mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of companies who have found exceptional talent through TalentHub
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="btn bg-white text-primary-600 hover:bg-gray-100">
              Create Account
            </Link>
            <Link to="/contact" className="btn border-white text-white hover:bg-primary-600">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPlansPage;