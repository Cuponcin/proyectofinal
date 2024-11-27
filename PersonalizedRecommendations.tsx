'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const RecommendationCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover" 
        />
      </div>
      <div className="mt-2">
        <h3 className="text-lg font-medium">{product.name}</h3>
        <p className="text-gray-600 text-sm">{product.description}</p>
        <p className="text-gray-900 font-bold mt-2">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default function PersonalizedRecommendations() {
  const [recommendations, setRecommendations] = useState<Product[]>([])

  useEffect(() => {
    // Simulating API call to fetch personalized recommendations
    const fetchRecommendations = async () => {
      const mockRecommendations: Product[] = [
        { id: 7, name: "Tablet Pro", price: 349.99, image: "https://i.pinimg.com/736x/e1/ff/40/e1ff40249dac202cd4afe82d9378ea30.jpg", description: "Potente tablet con pantalla de alta resolución" },
        { id: 8, name: "Smart TV 4K", price: 599.99, image: "https://i.pinimg.com/736x/19/c8/20/19c820e8ecfff3ea3348e71849f04a7f.jpg", description: "Televisor inteligente con calidad de imagen 4K" },
        { id: 9, name: "Altavoz Bluetooth", price: 79.99, image: "https://i.pinimg.com/736x/9d/53/2e/9d532eb96a6e57ece902f673e4b16ddd.jpg", description: "Altavoz portátil con sonido envolvente" },
      ]
      setRecommendations(mockRecommendations)
    }
    fetchRecommendations()
  }, [])

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-4">Recomendaciones para ti</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recommendations.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/product/${product.id}`}>
              <RecommendationCard product={product} />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

