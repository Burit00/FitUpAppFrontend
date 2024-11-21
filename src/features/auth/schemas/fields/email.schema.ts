import { z } from 'zod';

export const EmailSchema = z.string().min(1, 'Pole wymagane').email('Niepoprawny email');
