import { Router } from 'express';
import { uploadPost } from '../controllers/upload';

const router = Router();

router.post('/', uploadPost);

export default router;