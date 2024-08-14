// routes/departmentRoutes.js
import express from 'express';
import {
    createDepartment,
    getDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
} from '../controllers/department.controller.js';
import { authorize } from '../middlewares/Authorization.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

// router.use(authenticate);
router.post('/create', authenticate, authorize(['canCreateDepartment']), createDepartment);
router.get('/departments', authenticate, authorize(['canViewDepartments']), getDepartments);
router.put('/departments/:id', authenticate, authorize(['canUpdateDepartments']), updateDepartment);
router.delete('/departments/:id', authenticate, authorize(['canDeleteDepartment']), deleteDepartment);
router.get('/departments/:id', authorize(['canViewDepartments']), getDepartmentById);

export default router;
