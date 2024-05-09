import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const productPayload = z.object({
  name: z.string().min(1),
  categoryId: z.number(),
  quantity: z.number(),
  dueDate: z.string(),
});

export class ProductDto extends createZodDto(productPayload) {}
