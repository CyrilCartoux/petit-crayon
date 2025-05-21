import Link from "next/link";
import { useLanguage } from '@/contexts/LanguageContext';

interface Plan {
  id: string;
  price: string;
  href: string;
  isPopular: boolean;
}

const plans: Plan[] = [
  {
    id: "mini",
    price: "1,49€",
    href: "/paiement?plan=mini",
    isPopular: false
  },
  {
    id: "starter",
    price: "3,49€",
    href: "/paiement?plan=starter",
    isPopular: true
  },
  {
    id: "famille",
    price: "7,99€",
    href: "/paiement?plan=famille",
    isPopular: false
  }
];

export function PlanCard() {
  const { t } = useLanguage();

  const getFeatures = (planId: string): string[] => {
    const features = t(`plans.${planId}.features`);
    return Array.isArray(features) ? features : [features];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan, index) => (
        <div key={index} className={`bg-white rounded-2xl shadow-lg p-6 sm:p-8 border-2 ${plan.isPopular ? 'border-primary' : 'border-gray-100'} relative h-full`}>
          {plan.isPopular && (
            <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-tl-lg rounded-br-lg">
              {t('plans.popular')}
            </div>
          )}
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
            {t(`plans.${plan.id}.title`)}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            {t(`plans.${plan.id}.description`)}
          </p>
          <div className="flex items-baseline mb-4 sm:mb-6">
            <span className="text-3xl sm:text-4xl font-bold text-gray-900">
              {plan.price}
            </span>
            <span className="text-sm sm:text-base text-gray-500 ml-2">
              {t('plans.once')}
            </span>
          </div>
          <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
            {getFeatures(plan.id).map((feature, index) => (
              <li key={index} className="flex items-center text-sm sm:text-base text-gray-600">
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5 text-primary mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          <Link
            href={plan.href}
            className={`block w-full font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors duration-200 text-sm sm:text-base ${
              plan.isPopular
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            {t('plans.choose')}
          </Link>
        </div>
      ))}
    </div>
  );
} 