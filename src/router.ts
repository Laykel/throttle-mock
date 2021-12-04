import { Router } from "./deps.ts";
import {
  deleteCounters,
  getNotRateLimited,
  getRateLimited,
  getRoot,
  getStats,
} from "./controller.ts";

const router = new Router();

router.get("/", getRoot);
router.get("/limited", getRateLimited);
router.get("/open", getNotRateLimited);
router.get("/stats", getStats);
router.delete("/counters", deleteCounters);

export default router;
