import { z } from "zod";

export const FoodPostCreateSchema = z.object({
  title: z.string(),
  description: z.string(),
  priceRange: z.number(),
  location: z.string(),
  postedById: z.string(),
  categoryId: z.string(),
});

export const CategoryCreateSchema = z.object({
  name: z.enum(["Snacks", "Drinks", "Meals", "Sweets"]),
});
