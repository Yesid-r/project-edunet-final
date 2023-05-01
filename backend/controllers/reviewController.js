import Document from "../models/Document.js"
import Review from '../models/Review.js'



export const createReview = async(req, res) =>{
    const documentId = req.params.documentId
    const newReview = new Review({...req.body})
    
    try {
        const savedReview = await newReview.save()

        // after creating a new review now update the reviews array of the tour
        await Document.findByIdAndUpdate(documentId,{$push:{reviews: savedReview._id}})

        res.status(200).json({success:true, message:'Review submitted', data: savedReview})
    } catch (error) {
        res.status(500).json({success:false, message:'failed to submit'})
        
    }
}

export const findAllReviews = async(req, res) =>{

    try {
        
    } catch (error) {
        
    }
    

}