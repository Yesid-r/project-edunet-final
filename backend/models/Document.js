import mongoose from 'mongoose'

const documentSchema = new mongoose.Schema(
    {
        title: {
          type: String,
          required: true,
          unique: true,
        },
        subject: {
          type: String,
          required: true,
        },
        semester: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        useremail: {
          type: String,
          required: true,
        },
        documentUrl: {
          type: String,
          required: true,
        },
        desc: {
          type: String,
          required: true,
        },
    
        reviews: [
          {
            type: mongoose.Types.ObjectId,
            ref: "Review",
          },
        ],
      },
      { timestamps: true }
)

export default mongoose.model('Document', documentSchema)