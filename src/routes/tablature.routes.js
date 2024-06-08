import { Router } from 'express';
import {
  createTablature, getAllTablatures, getTablatureById,
  updateTablature, deleteTablature,
} from '../controllers/tablature.controllers.js';

const router = Router();

router.post('/', createTablature);
router.get('/', getAllTablatures);
router.get('/:id', getTablatureById);
router.put('/:id', updateTablature);
router.delete('/:id', deleteTablature);

export default router;
