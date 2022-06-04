import { Router } from 'express';

import { uploadPost } from '../controllers/upload';
import { validateToken } from '../middlewares/validateJWT';
import { upload } from '../middlewares/upload';

const router = Router();

router.post('/', [validateToken ,upload], uploadPost);

export default router;