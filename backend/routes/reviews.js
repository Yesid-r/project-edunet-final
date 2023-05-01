import express from 'express'
import { createReview , findAllReviews} from '../controllers/reviewController.js'
import { verifyUser } from '../utils/verifyToken.js'
const router = express.Router()

router.post('/:documentId', createReview)
router.get('/:documentId', findAllReviews)

export default router