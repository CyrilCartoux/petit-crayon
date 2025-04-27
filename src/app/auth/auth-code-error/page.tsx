import Link from 'next/link';

export default function AuthCodeError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Erreur de vérification
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Le lien de vérification est invalide ou a expiré.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="text-center">
            <Link
              href="/auth"
              className="font-medium text-primary hover:text-primary-dark"
            >
              Retour à la page de connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 