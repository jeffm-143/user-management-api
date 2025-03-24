import { Router, Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";

const router = Router();

// Route to create a new user
router.post("/users", async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    try {
        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const userRepo = AppDataSource.getRepository(User);

        const user = userRepo.create({ name, email, password: hashedPassword });

        await userRepo.save(user);

        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Error creating user" });
    }
});

// Route to retrieve all users
router.get("/users", async (req: Request, res: Response) => {
    try {
        const userRepo = AppDataSource.getRepository(User);

        const users = await userRepo.find();

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving users" });
    }
});

// Route to retrieve a single user by ID
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

// Route to delete a user by ID
router.delete("/users/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const userRepo = AppDataSource.getRepository(User);

        const user = await userRepo.findOneBy({ id: parseInt(id) });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await userRepo.remove(user as User);

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting user" });
    }
});

export default router;
