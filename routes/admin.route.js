import express from 'express';
import { createAdmin, getMessagesForAdmin, LoginAdmin } from '../controllers/admin.controller.js';
import { authenticate } from '../middlewares/authenticate.js';
import { authorize } from '../middlewares/Authorization.js';

const router = express.Router();

router.post('/create', createAdmin);
router.post('/login', LoginAdmin);
// authenticate()
router.get('/messages', getMessagesForAdmin);


export default router;
