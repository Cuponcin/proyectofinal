import { Package, UserCircle, MapPin, CreditCard, DollarSign, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: Package,
    title: 'Envío gratis',
    description: 'Beneficio por ser tu primera compra.'
  },
  {
    icon: UserCircle,
    title: 'Ingresá a tu cuenta',
    description: 'Disfrutá de ofertas y comprá sin límites.'
  },
  {
    icon: MapPin,
    title: 'Ingresá tu ubicación',
    description: 'Consultá costos y tiempos de entrega.'
  },
  {
    icon: CreditCard,
    title: 'Medios de pago',
    description: 'Pagá tus compras de forma rápida y segura.'
  },
  {
    icon: DollarSign,
    title: 'Menos de $20.000',
    description: 'Descubrí productos con precios bajos.'
  },
  {
    icon: TrendingUp,
    title: 'Más vendidos',
    description: 'Explorá los productos que son tendencia.'
  }
]

export default function Features() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <feature.icon className="h-8 w-8 text-blue-500 mb-4" />
            <h3 className="font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

