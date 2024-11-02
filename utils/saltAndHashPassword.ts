// hashPassword.js
import { hash } from "bcryptjs";

export const hashPassword = async (password: string) => {
    try {
        const saltRounds = 10; // The number of rounds for salting
        const hashedPassword = await hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error("Error hashing password:", error);
        throw new Error("Password hashing failed");
    }
};
