import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from './ui/button'

interface CartItem {
  id: number
  name: string
  price: number
}

interface CartProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  removeFromCart: (id: number) => void
}

export default function Cart({ isOpen, onClose, items, removeFromCart }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price, 0)

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
              <h2 className="text-2xl font-bold">Carrito</h2>
              <Button variant="ghost" onClick={onClose}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            {items.length === 0 ? (
              <p>Tu carrito está vacío.</p>
            ) : (
              <>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex justify-between items-center border-b py-2"
                  >
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    </div>
                    <Button variant="ghost" onClick={() => removeFromCart(item.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
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

