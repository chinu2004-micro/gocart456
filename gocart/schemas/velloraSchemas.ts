import { z } from 'zod';

export const registrationSchema = z
  .object({
    name: z.string().min(2, 'Full name must be at least 2 characters'),
    userId: z.string().optional(),
    email: z.string().email('Please enter a valid email address'),
    contact: z.string().min(8, 'Phone number must be at least 8 digits'),
    street: z.string().min(3, 'Delivery address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    pincode: z.string().min(3, 'Pincode is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    termsAccepted: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export const loginSchema = z.object({
  identifier: z.string().min(3, 'Enter your User ID or Email'),
  password: z.string().min(6, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const addressSchema = z.object({
  name: z.string().min(2, 'Full name is required'),
  contact: z.string().min(10, 'Valid 10-digit phone number is required'),
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().regex(/^[0-9]{6}$/, 'Enter a valid 6-digit postal code'),
  country: z.string().default('India'),
  isDefault: z.boolean().default(false),
});

export type AddressFormData = z.infer<typeof addressSchema>;
