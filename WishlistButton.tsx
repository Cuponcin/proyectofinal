'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'

interface WishlistButtonProps {
  productId: number
}

export default function WishlistButton({ productId }: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false)

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist)
    // Aquí se implementaría la lógica para agregar/quitar el producto de la lista de deseos
  }

  return (
    <motion.div whileTap={{ scale: 0.95 }}>
      <Button
        variant="outline"
        className={`flex items-center ${isInWishlist ? 'text-red-500' : 'text-gray-500'}`}
        onClick={toggleWishlist}
      >
        <Heart className={`mr-2 ${isInWishlist ? 'fill-current' : ''}`} />
        {isInWishlist ? 'En la lista de deseos' : 'Agregar a la lista de deseos'}
      </Button>
    </motion.div>
  )
}

