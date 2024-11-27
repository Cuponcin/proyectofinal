'use client'

import { useState } from 'react'
import Header from '../components/Header'
import Carousel from '../components/Carousel'
import Features from '../components/Features'
import ProductList from '../components/ProductList'
import Footer from '../components/Footer'

const slides = [
  {
    id: 1,
    image: 'https://http2.mlstatic.com/D_NQ_775206-MLA80973936301_112024-OO.jpg',
    title: 'Ofertas Relampago',
    description: 'Solo por 24 horas'
  },
  {
    id: 2,
    image: 'https://http2.mlstatic.com/D_NQ_824099-MLA80961923283_112024-OO.webp',
    title: 'Nuevos Productos',
    description: 'Descubre lo último en tecnología'
  },
  {
    id: 3,
    image: 'https://http2.mlstatic.com/D_NQ_742464-MLA80848522519_112024-OO.jpg',
    title: 'Envío Gratis',
    description: 'En compras superiores a $999'
  }
]

export default function Home() {
  const [cartItems, setCartItems] = useState<{ id: number; name: string; price: number; quantity: number }[]>([])

  const addToCart = (product: { id: number; name: string; price: number }) => {
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

  return (
    <div className="min-h-screen bg-gray-100">
      <Header cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} />
      <main>
        <Carousel slides={slides} />
        <Features />
        <div className="py-8">
          <ProductList addToCart={addToCart} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

