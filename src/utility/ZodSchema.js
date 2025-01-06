const {z} = require ('zod')

const UsersZodSchema = z.object({
    userName: z.string().min(1, {
        message: "User Name is required",
    }),
    // lastname: z.string().min(1, {
    //     message: "Last name is required",
    // }),
    email: z
        .string()
        .email()
        .nonempty({
            message: "Email address is required",
        })
        .transform((str) => str.toLowerCase()),

    // phone: z.string().min(1, {
    //     message: "Phone number is required",
    // }),
    address: z.string().min(1, {
        message: "Address is required",
    }),
    password: z.string().min(6, {
        message: "Password is required",
    }).max(20),
    // gender: z.enum(["male", "female"], {
    //     errorMap: (issue, ctx) => ({
    //         message: `${ctx.data} is not a valid gender. Gender must be either 'male' or 'female'.`,
    //     }),
    // }),
});

module.exports = { UsersZodSchema };