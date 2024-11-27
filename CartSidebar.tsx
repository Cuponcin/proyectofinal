import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from './ui/button'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
}

export default function CartSidebar({ isOpen, onClose, cartItems }: CartSidebarProps) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-lg z-50 overflow-y-auto"
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Carrito de Compras</h2>
              <Button variant="ghost" onClick={onClose}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            {cartItems.length === 0 ? (
              <p>Tu carrito está vacío.</p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b py-2">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-gray-600">Cantidad: {item.quantity}</p>
                    </div>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                <div className="mt-4">
                  <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
                  <Button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white">
                    Proceder al pago
                  </Button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

