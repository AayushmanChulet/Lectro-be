import Express from "express";
import aiApp from "../app/aiRouter"

const router = Express.Router();

router.use("/app", aiApp);

export default router;