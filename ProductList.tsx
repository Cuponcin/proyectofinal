'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  price: number
  image: string
}

interface ProductListProps {
  addToCart: (product: Product) => void
}

export default function ProductList({ addToCart }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        // Simulating API call
        const mockProducts: Product[] = [
          { id: 1, name: "Smartphone XYZ", price: 599.99, image: "https://i.pinimg.com/736x/11/ae/dc/11aedc4c5751eda7094b92732ad44051.jpg" },
          { id: 2, name: "Laptop ABC", price: 999.99, image: "https://i.pinimg.com/736x/89/37/a7/8937a73ab5739901389da9cdb652a492.jpg" },
          { id: 3, name: "Headphones 123", price: 149.99, image: "https://i.pinimg.com/736x/5f/32/d9/5f32d9986b56fb3d500ea7cf41568ec4.jpg" },
          { id: 4, name: "Smartwatch Pro", price: 249.99, image: "https://i.pinimg.com/736x/37/a8/ae/37a8ae2095512429d5d0ffa5d8675378.jpg" },
          { id: 5, name: "Cámara DSLR", price: 799.99, image: "https://i.pinimg.com/736x/5b/42/97/5b429786955baeb563868487e7340038.jpg" },
          { id: 6, name: "Consola de Juegos", price: 399.99, image: "https://i.pinimg.com/736x/f1/e2/38/f1e23811c76c0e1385d00fe50061f706.jpg" },
        ]
        setProducts(mockProducts)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (isLoading) {
    return <div>Cargando productos...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Productos Destacados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <motion.div 
            key={product.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link href={`/product/${product.id}`}>
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover" 
              />
            </Link>
            <div className="p-4">
              <Link href={`/product/${product.id}`}>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors">{product.name}</h3>
              </Link>
              <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
              <Button 
                onClick={() => addToCart(product)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Agregar al carrito
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

