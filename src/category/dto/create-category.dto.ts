import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const categoryPayload = z.object({
  name: z.string({ required_error: 'name is required' }).min(1),
  description: z.string({ required_error: 'description is required' }).min(1),
});

export class CreateCategoryDto extends createZodDto(categoryPayload) {}
