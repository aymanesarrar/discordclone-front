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
    confirmpassword: z
      .string({
        required_error: "password is required",
        invalid_type_error: "password must be a string",
      })
      .min(8, { message: "password must be at least 8 characters long" })
      .max(256, { message: "very long password" }),
  })
  .superRefine(({ confirmpassword, password }, ctx) => {
    if (confirmpassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords doesn't match",
      });
    }
  });
export { signUpSchema };
