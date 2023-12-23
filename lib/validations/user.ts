import * as z from "zod";

export const UserValidation = z.object({
  profile_photo: z.string().url().nonempty({
    message: "Can't be empty!",
  }),
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 caracters." }),
  username: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 caracters." }),
  // .refine((value) => !/\s/.test(value), {
  //   message: "Username cannot contain spaces",
  // }),

  bio: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(1000, { message: "Maximum 1000 caracters." }),
});
