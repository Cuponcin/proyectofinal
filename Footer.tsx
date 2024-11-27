export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">MercadoWeb</h3>
            <p>Tu destino para compras en línea</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Enlaces Rápidos</h4>
            <ul>
              <li><a href="#" className="hover:text-gray-300">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-gray-300">Contacto</a></li>
              <li><a href="#" className="hover:text-gray-300">Términos y Condiciones</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">Facebook</a>
              <a href="#" className="hover:text-gray-300">Twitter</a>
              <a href="#" className="hover:text-gray-300">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 MercadoWeb. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

