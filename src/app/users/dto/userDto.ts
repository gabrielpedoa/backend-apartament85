import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const userPayload = z.object({
  name: z.string({ required_error: 'Name is required' }),
  email: z.string({ required_error: 'Email is required' }),
  password: z.string({ required_error: 'Password is required' }),
});

export class UserDto extends createZodDto(userPayload) {}
