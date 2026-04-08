
import * as zod from 'zod';

export const registerschema = zod.object({
    name: zod.string().nonempty("Name is required").min(3,"Name must be at least 3 characters").max(10,'max 10 chars'),
    email: zod.string().nonempty("Email is required").email("Invalid email address"),
    password:zod.string().nonempty("Password is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, `Has minimum 8 characters in length.
At least one uppercase English letter.
At least one lowercase English letter.
At least one digit.
At least one special character`),
    rePassword:zod.string().nonempty("Confirm Password is required"),
    phone:zod.string().nonempty("Phone number is required").regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number")
}).refine((data) => data.password === data.rePassword, {
    error: "Passwords don't match",
    path: ["rePassword"]
});

export type registerSchemaType = zod.infer<typeof registerschema>;