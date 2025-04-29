export default function Footer() {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex justify-center md:justify-start">
            <img
              src="/images/logo-coloring.png"
              alt="Petit Crayon"
              className="w-40 md:w-64"
            />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">À propos</h3>
            <p className="text-gray-600">
            Donnez vie à vos souvenirs, amusez vos enfants !
            </p>
            <p className="text-gray-600">
            Transformez facilement vos photos en coloriages uniques. Parfait pour les petits artistes comme pour les grands rêveurs.


            </p>
          </div>
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact</h3>
            <p className="text-gray-600">
              petitcrayon.fr@gmail.com<br />
              +33 6 12 45 71 14
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p>© 2025 Petit Crayon. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
} 