import { Router } from "express";
import {signUp, login} from '../controllers/auth';
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";

const router = Router();

router.post('/signup', [
    check('firstName', 'The firstName is required.').not().isEmpty(),
    check('lastName', 'The lastName is required.').not().isEmpty(),
    check('email', 'This email is not valid.').isEmail(),
    check('password', 'The password must have more than 6 letters.').isLength({ min: 6 }),
    validateFields
], signUp);
router.post('/login', login);

export default router;