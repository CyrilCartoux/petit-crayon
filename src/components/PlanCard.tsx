import Link from "next/link";

interface Plan {
  title: string;
  description: string;
  price: string;
  features: string[];
  href: string;
  isPopular: boolean;
}

const plans: Plan[] = [
  {
    title: "Mini",
    description: "🖍️ Parfait pour tester en douceur.",
    price: "1,49€",
    features: ["2 coloriages"],
    href: "/paiement?plan=mini",
    isPopular: false
  },
  {
    title: "Starter",
    description: "✨ Le début parfait pour découvrir la magie",
    price: "3,49€",
    features: ["5 coloriages"],
    href: "/paiement?plan=starter",
    isPopular: true
  },
  {
    title: "Famille",
    description: "👨‍👩‍👧‍👦 Pour revivre vos plus beaux souvenirs en famille.",
    price: "7,99€",
    features: ["12 coloriages"],
    href: "/paiement?plan=famille",
    isPopular: false
  }
];

export function PlanCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan, index) => (
        <div key={index} className={`bg-white rounded-2xl shadow-lg p-6 sm:p-8 border-2 ${plan.isPopular ? 'border-primary' : 'border-gray-100'} relative h-full`}>
          {plan.isPopular && (
            <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-tl-lg rounded-br-lg">
              POPULAIRE
            </div>
          )}
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
            {plan.title}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            {plan.description}
          </p>
          <div className="flex items-baseline mb-4 sm:mb-6">
            <span className="text-3xl sm:text-4xl font-bold text-gray-900">
              {plan.price}
            </span>
            <span className="text-sm sm:text-base text-gray-500 ml-2">
              / paiement unique
            </span>
          </div>
          <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
            {plan.features.map((feature, index) => (
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
            Choisir
          </Link>
        </div>
      ))}
    </div>
  );
} 