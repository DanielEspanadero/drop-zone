import { Router } from "express";
import { error404 } from "../controllers/error404";

const router = Router();

router.get('/', error404);
router.post('/', error404);
router.put('/', error404);
router.delete('/', error404);

export default router;