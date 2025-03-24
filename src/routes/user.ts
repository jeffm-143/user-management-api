import { Router } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

const router = Router();

router.post("/users", async (req: Request, res: Response) => {
    const { name, email } = req.body;
    try {
        const userRepo = AppDataSource.getRepository(User);
        const user = userRepo.create({ name, email });
        await userRepo.save(user);
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Error creating user" });
    }
});


export default router;
