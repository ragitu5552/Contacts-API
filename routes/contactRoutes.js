import express from 'express';
import {getAllContacts, createContact, getContact, updateContact, deleteContact} from '../controllers/contactControllers.js';
import {validateToken} from '../middleware/validateTokenHandler.js';

const router = express.Router();

router.get('/contacts', validateToken, getAllContacts);
router.post('/contacts', validateToken, createContact);
router.get('/contacts/:id', validateToken, getContact);
router.put('/contacts/:id', validateToken, updateContact);
router.delete('/contacts/:id', validateToken, deleteContact);

export default router;