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

export const updatePlayerSchema = baseSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: "At least one field must be provided",
        path: []
    });

export type UpdatePlayerInput = z.infer<typeof updatePlayerSchema>;
