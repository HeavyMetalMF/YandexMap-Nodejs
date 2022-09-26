import Router from "express";
import MarkController from "./MarkController.js";
import {authMiddleware} from "./middleware/authMiddleware.js";


const router = new Router();

router.get('/mark', authMiddleware,  MarkController.getAll);
router.post('/mark', authMiddleware, MarkController.createMark);
router.delete('/mark', authMiddleware, MarkController.deleteMark);
router.put('/mark', authMiddleware, MarkController.updateMark);

export default router;