import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import enrollmentsRouter from "./enrollments";
import testimonialsRouter from "./testimonials";
import newsletterRouter from "./newsletter";
import chatRouter from "./chat";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(enrollmentsRouter);
router.use(testimonialsRouter);
router.use(newsletterRouter);
router.use(chatRouter);
router.use(adminRouter);

export default router;
