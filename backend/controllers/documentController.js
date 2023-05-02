import Document from "../models/Document.js";

//create new document
export const createDocument = async (req,res)=>{
    const newDocument = new Document(req.body)

    try{
        const savedDocument = await newDocument.save()
        console.log(savedDocument)
        res.status(200).json({success:true,message:"Successfully created",data:savedDocument})
    } catch(err){
        res.status(500).json({success:false,message:"Failed to create. Try again"})
    }
}

export const updateDocument = async(req,res) =>{
    const id  = req.params.id
    try{
        const updateDocument = await Document.findByIdAndUpdate(id, {$set: req.body}, {new:true})
        res.status(200).json({success:true,message:"Successfully updated",data:updateDocument})
    }catch(err){
        res.status(500).json({success:false,message:"Failed to update. Try again"})
    }
}


export const deleteDocument = async(req,res) =>{
    const id  = req.params.id
    try{
        await Document.findByIdAndDelete(id)
        res.status(200).json({success:true,message:"Successfully deleted "})
    }catch(err){
        res.status(500).json({success:false,message:"Failed to delete. Try again"})
    }
}

//get single
export const getDocument = async(req,res) =>{
    const id  = req.params.id
    console.log(`id ingresado: ${id}`)
    try{
        //const Document = await Document.findById(id).populate('reviews')
        const document = await Document.findById(id)
        console.log(`documento encontrado: ${document}`)
        
        res.status(200).json({success:true,message:"Successful search",data:document})
    }catch(err){
        res.status(404).json({success:false,message:"not found"})
        
    }
}

//find all

export const findAllDocument = async(req,res) =>{
// for pagination
    const page = parseInt(req.query.page)
    // console.log(page)
    try{

        const documents = await Document.find({})
        res.status(200).json({success:true, message:"succesful search", count: documents.length,data:documents})

    }catch(err){
        res.status(404).json({success:false,message:"not found"})
    }
}


// get document by search



export const getDocumentBySearch = async(req, res)=>{

    const subject = req.query.subject
    const semester =  req.query.semester
    console.log(`materia a buscar: ${subject}`)
    

    try{
        const documents = await Document.find({subject})

        res.status(200).json({success:true, message:"succesful search", count: documents.length,data:documents})

    }catch(err){
        res.status(404).json({success:false,message:"not found"})
    }
}


export const getDocumentCount = async(req, res)=>{

    try {
        const documentCount = await Document.estimatedDocumentCount()
        res.status(200).json({succes:true, data:documentCount })
    } catch (error) {
        res.status(500).json({succes: false, message: 'Failed to fetch'})
    }
}
export const getDocumentsUser = async(req,res) =>{
    const username  = req.params.user

    console.log('user to search: ', username)
    try {
        const documents = await Document.find({ username: username });
        res.status(200).json({success:true, message:"succesful search", count: documents.length,data:documents})
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}