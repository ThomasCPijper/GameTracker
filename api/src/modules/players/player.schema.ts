import z from "zod";

export const baseSchema = z.object({
    name: z.string().trim().nullish(),
    email: z.email({ message: "Email is required" })
        .trim()
        .min(1, "Email should not be empty"),
    auth0id: z.string({ message: "Auth0id should not be empty" }).trim()
});

export type CreatePlayerInput = z.infer<typeof baseSchema>;

export const updatePlayerSchema = baseSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: "At least one field must be provided",
        path: []
    });

export type UpdatePlayerInput = z.infer<typeof updatePlayerSchema>;
