import express from 'express'
import { getTransription } from '../../controller/app/aiController';

const router = express.Router();

router.get("/", getTransription);


export default router;