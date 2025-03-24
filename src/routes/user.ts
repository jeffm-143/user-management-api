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

router.get("/users", async (req: Request, res: Response) => {
    try {
      const userRepo = AppDataSource.getRepository(User);
      const users = await userRepo.find();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving users" });
    }
  });
  
  router.get("/users/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOneBy({ id: parseInt(id) });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving user" });
    }
  });


export default router;
