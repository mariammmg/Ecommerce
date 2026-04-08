
import * as zod from 'zod';

export const loginschema = zod.object({
    email: zod.string().nonempty("Email is required").email("Invalid email address"),
    password:zod.string().nonempty("Password is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, `Has minimum 8 characters in length.
At least one uppercase English letter.
At least one lowercase English letter.
At least one digit.
At least one special character`),
    
})

export type loginSchemaType = zod.infer<typeof loginschema>;