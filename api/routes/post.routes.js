import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  res.json({ msg: "hello world" });
});

export default router;
