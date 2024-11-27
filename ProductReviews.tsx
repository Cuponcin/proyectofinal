'use client'

import { useState } from 'react'
import { Star, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

interface Review {
  id: number
  user: string
  rating: number
  comment: string
  date: string
}

interface ProductReviewsProps {
  productId: number
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([
    { id: 1, user: 'Juan P.', rating: 5, comment: 'Excelente producto, muy satisfecho con la compra.', date: '2023-05-15' },
    { id: 2, user: 'María L.', rating: 4, comment: 'Buen producto, pero la entrega tardó más de lo esperado.', date: '2023-05-10' },
  ])
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' })

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (newReview.rating === 0 || newReview.comment.trim() === '') return

    const review: Review = {
      id: reviews.length + 1,
      user: 'Usuario Anónimo',
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
    }

    setReviews([review, ...reviews])
    setNewReview({ rating: 0, comment: '' })
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Reseñas del Producto</h3>
      <form onSubmit={handleSubmitReview} className="mb-6">
        <div className="flex items-center mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-6 w-6 cursor-pointer ${
                star <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
              onClick={() => setNewReview({ ...newReview, rating: star })}
            />
          ))}
        </div>
        <Textarea
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          placeholder="Escribe tu reseña aquí..."
          className="mb-2"
        />
        <Button type="submit">Enviar Reseña</Button>
      </form>
      <div className="space-y-4">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-4 rounded-lg shadow"
          >
            <div className="flex items-center mb-2">
              <User className="h-6 w-6 mr-2" />
              <span className="font-semibold">{review.user}</span>
            </div>
            <div className="flex items-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600 mb-2">{review.comment}</p>
            <p className="text-sm text-gray-400">{review.date}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

