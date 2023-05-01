import  express  from "express";
import { createDocument, deleteDocument, findAllDocument, getDocument, getDocumentBySearch, getDocumentCount, updateDocument, getDocumentsUser } from "../controllers/documentController.js";
import { verifAdmin } from "../utils/verifyToken.js";
const router = express.Router()

//create new tour

router.post('/',  createDocument)

router.put('/:id',  updateDocument)

router.delete('/:id', deleteDocument)

router.get('/:id', getDocument)

router.get('/', findAllDocument)

//get document by search

router.get('/search/:user', getDocumentsUser)

router.get('/search/document/getDocumentBySearch', getDocumentBySearch )

router.get('/search/getDocumentCount', getDocumentCount)



export default router