import { Router } from 'express';

import { uploadPost } from '../controllers/upload';

import { upload } from '../middlewares/upload';

const router = Router();

router.post('/', upload, uploadPost);

export default router;