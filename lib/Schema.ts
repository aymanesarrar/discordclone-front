import { z } from "zod";

const signUpSchema = z
  .object({
    email: z
      .string({
        required_error: "email is required",
        invalid_type_error: "email must be a string",
      })
      .email({ message: "invalid email address" }),
    username: z.string({
      required_error: "username is required",
      invalid_type_error: "username must be a string",
    }),
    password: z
      .string({
        required_error: "password is required",
        invalid_type_error: "password must be a string",
      })
      .min(8, { message: "password must be at least 8 characters long" })
      .max(256, { message: "very long password" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "password must contain : 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character",
        }
      ),
    confirmPassword: z
      .string({
        required_error: "password is required",
        invalid_type_error: "password must be a string",
      })
      .min(8, { message: "password must be at least 8 characters long" })
      .max(256, { message: "very long password" }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords doesn't match",
        path: ["confirmPassword"],
      });
    }
  });
const profileSchema = z.object({
  firstName: z
    .string({
      required_error: "first name is required",
      invalid_type_error: "first name must be a string",
    })
    .regex(/[a-zA-Z]+/),
  lastName: z
    .string({
      required_error: "last name is required",
      invalid_type_error: "last name must be a string",
    })
    .regex(/[a-zA-Z]+/),
  bio: z.string({
    required_error: "bio is required",
    invalid_type_error: "bio must be a string",
  }),
});
export { signUpSchema, profileSchema };
