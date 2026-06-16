import z from "zod";

export const baseSchema = z.object({
    name: z.string({ message: "Player name is required" })
        .trim()
        .min(1, "Player name should not be empty"),
    email: z.email({ message: "Email is required" })
        .trim()
        .min(1, "Email should not be empty")
});

export type CreatePlayerInput = z.infer<typeof baseSchema>;