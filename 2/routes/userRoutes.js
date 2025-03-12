import express from "express";
import { createUserController, getUsersController, updateUserController, deleteUserController } from "../controllers/userController.js";

const router = express.Router();

router.post("/users", createUserController);
router.get("/users", getUsersController);
router.put("/users/:id", updateUserController);
router.delete("/users/:id", deleteUserController);

export default router;