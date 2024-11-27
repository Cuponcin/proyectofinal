'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { Button } from '../../../components/ui/button'
import { motion } from 'framer-motion'
import ProductReviews from '../../../components/ProductReviews'
import WishlistButton from '../../../components/WishlistButton'
import PersonalizedRecommendations from '../../../components/PersonalizedRecommendations'

interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
}

export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [cartItems, setCartItems] = useState<{ id: number; name: string; price: number; quantity: number }[]>([])

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)
      try {
        // Simulating API call to fetch product details
        const mockProduct: Product = {
          id: Number(id),
          name: "Smartphone XYZ",
          price: 599.99,
          image: "https://i.pinimg.com/736x/11/ae/dc/11aedc4c5751eda7094b92732ad44051.jpg",
          description: "Un smartphone de última generación con cámara de alta resolución, pantalla AMOLED de 6.5 pulgadas, procesador octa-core y 5G. Perfecto para capturar momentos inolvidables y disfrutar de una experiencia móvil fluida y rápida."
        }
        setProduct(mockProduct)
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  if (isLoading) {
    return <div>Cargando...</div>
  }

  if (!product) {
    return <div>Producto no encontrado</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg shadow-lg" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
                onClick={() => addToCart(product)}
              >
                Agregar al carrito
              </Button>
              <WishlistButton productId={product.id} />
            </div>
          </motion.div>
        </div>
        <ProductReviews productId={product.id} />
        <PersonalizedRecommendations />
      </main>
      <Footer />
    </div>
  )
}

