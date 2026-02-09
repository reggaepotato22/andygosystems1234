import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface PricingProps {
  onOpenEnquiry: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onOpenEnquiry }) => {
  const plans = [
    {
      name: "Basic",
      price: "$2,500",
      description: "Perfect for startups and MVPs.",
      features: ["Custom Landing Page", "React + Vite Performance", "Basic SEO Optimization", "Mobile Responsive", "1 Month Support"],
      popular: false
    },
    {
      name: "Professional",
      price: "$5,000",
      description: "For growing businesses needing scale.",
      features: ["Full Web Application", "Backend Integration (Node.js)", "Database Design", "Advanced Animations", "3 Months Support"],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Large-scale systems and automation.",
      features: ["Cloud Infrastructure (AWS)", "Microservices Architecture", "Custom AI Integration", "Dedicated DevOps", "24/7 Priority Support"],
      popular: false
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-charcoal dim:bg-charcoal-light transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-amber font-mono text-sm tracking-widest uppercase mb-4 block">Pricing Plans</span>
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal dark:text-white mb-4">Available upon request</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose the best plan for you. Contact us for a custom quote.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: index * 0.2 }}
              className={`relative p-8 rounded-3xl transition-all duration-300 ${
                plan.popular 
                  ? 'bg-charcoal dark:bg-white/5 dim:bg-white/10 border-2 border-amber shadow-2xl z-10' 
                  : 'bg-gray-50 dark:bg-white/5 dim:bg-white/10 border border-gray-200 dark:border-white/10 hover:border-amber/50 hover:shadow-xl'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber text-charcoal font-bold px-4 py-1 rounded-full text-sm">
                  Most Popular
                </div>
              )}

              <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-charcoal dark:text-white'}`}>
                {plan.name}
              </h3>
              <div className="text-xl font-bold text-amber mb-4">Custom Quote</div>
              <p className="text-gray-500 dark:text-gray-400 mb-8">{plan.description}</p>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-amber/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-amber" />
                    </div>
                    <span className={`text-sm ${plan.popular ? 'text-gray-300' : 'text-gray-600 dark:text-gray-300'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={onOpenEnquiry}
                className={`w-full py-4 rounded-xl font-bold transition-colors ${
                plan.popular
                  ? 'bg-amber text-charcoal hover:bg-white hover:text-charcoal'
                  : 'bg-white dark:bg-white/10 dim:bg-white/20 text-charcoal dark:text-white hover:bg-amber hover:text-charcoal border border-gray-200 dark:border-white/10'
              }`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
