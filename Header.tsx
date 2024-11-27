'use client'

import { useState } from 'react'
import { MapPin, ShoppingCart, Search, ChevronDown, User } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { motion, AnimatePresence } from 'framer-motion'
import LoginModal from './LoginModal'
import CartSidebar from './CartSidebar'

interface HeaderProps {
  cartItems: { id: number; name: string; price: number; quantity: number }[];
  addToCart: (product: { id: number; name: string; price: number }) => void;
  removeFromCart: (productId: number) => void;
}

export default function Header({ cartItems, addToCart, removeFromCart }: HeaderProps) {
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = (username: string, password: string) => {
    console.log('Logging in with:', username, password)
    setIsLoggedIn(true)
    setIsLoginModalOpen(false)
  }

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <motion.header 
      className="w-full"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-[#FFE600] py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Logo */}
            <a href="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold">MercadoWeb</h1>
            </a>

            {/* Search Bar */}
            <div className="flex-grow max-w-2xl w-full order-1 md:order-none mt-2 md:mt-0">
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="Buscar productos, marcas y más..." 
                  className="w-full py-2 pl-4 pr-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-4 flex-wrap justify-end">
              <Button variant="ghost" className="text-sm" onClick={() => setIsLoginModalOpen(true)}>
                {isLoggedIn ? (
                  <>
                    <User className="h-4 w-4 mr-1" />
                    Mi cuenta
                  </>
                ) : (
                  'Ingresar'
                )}
              </Button>
              <Button variant="ghost" className="text-sm">
                Mis compras
              </Button>
              <Button variant="ghost" className="relative" onClick={() => setIsCartOpen(true)}>
                <ShoppingCart className="h-6 w-6" />
                <AnimatePresence>
                  {cartItemCount > 0 && (
                    <motion.span
                      key="cart-count"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      {cartItemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <nav className="bg-[#FFFFFF] border-b">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-6 py-2 overflow-x-auto whitespace-nowrap">
            <li>
              <Button variant="ghost" className="text-sm font-medium">
                Categorías <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </li>
            <li><a href="#" className="text-sm hover:text-blue-500">Ofertas</a></li>
            <li><a href="#" className="text-sm hover:text-blue-500">Cupones</a></li>
            <li><a href="#" className="text-sm hover:text-blue-500">Supermercado</a></li>
            <li><a href="#" className="text-sm hover:text-blue-500">Moda</a></li>
            <li>
              <a href="#" className="text-sm bg-[#E5F2FF] text-blue-500 px-2 py-1 rounded">
                Mercado Play
              </a>
            </li>
            <li><a href="#" className="text-sm hover:text-blue-500">Vender</a></li>
            <li><a href="#" className="text-sm hover:text-blue-500">Ayuda</a></li>
          </ul>
        </div>
      </nav>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={handleLogin} />
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        removeFromCart={removeFromCart}
      />
    </motion.header>
  )
}

