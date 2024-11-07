import { z } from 'zod';

class PasswordRequirements {
  public static minLength = 8;
  public static maxLength = 20;
  public static lowercaseAmount = 1;
  public static lowerCaseREGEX = new RegExp('[a-z]{1,}');
  public static uppercaseAmount = 1;
  public static uppercaseREGEX = new RegExp('[A-Z]{1,}');
  public static digitsAmount = 1;
  public static digitsREGEX = new RegExp(`[0-9]{${this.digitsAmount},}`);
  public static specialCharAmount = 1;
  public static specialCharREGEX = new RegExp(`[!@#$%^&*)(+=._-]{${this.digitsAmount},}`);
}

export const SignUpSchema = z
  .object({
    email: z.string().min(1, 'Pole wymagane').email('Niepoprawny email'),
    password: z
      .string()
      .min(1, 'Pole wymagane')
      .min(
        PasswordRequirements.minLength,
        `Hasło powinno mieć od ${PasswordRequirements.minLength} do ${PasswordRequirements.maxLength} znaków`,
      )
      .max(
        PasswordRequirements.maxLength,
        `Hasło powinno mieć od ${PasswordRequirements.minLength} do ${PasswordRequirements.maxLength} znaków`,
      )
      .regex(
        PasswordRequirements.lowerCaseREGEX,
        `Wymagana ilość małych liter: ${PasswordRequirements.lowercaseAmount}.`,
      )
      .regex(PasswordRequirements.uppercaseREGEX, 'Hasło musi mieć co najmniej jedną wielką literę.')
      .regex(PasswordRequirements.digitsREGEX, 'Hasło musi mieć co najmniej jedną cyfrę.')
      .regex(PasswordRequirements.specialCharREGEX, 'Hasło musi mieć co najmniej jeden znak specjalny.'),
    confirmPassword: z.string().min(1, 'Pole wymagane'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Hasła nie są takie same',
        path: ['confirmPassword'],
      });
    }
  });
