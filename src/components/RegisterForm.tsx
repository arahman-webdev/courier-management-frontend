import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { FormDescription, FormField, FormMessage, FormItem, FormLabel, FormControl, Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import Password from "./layout/Password"
import { Link } from "react-router"
import { useRegisterMutation } from "@/redux/features/auth.api"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"


const formSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.email().min(4, { message: "Email must be at least 4 charecter" }).max(50),
    password: z.string().min(6, { error: "Password must be at least 6 charecter" }),
    confirmPassword: z.string().min(6, { error: "Confirm Password must be at least 6 charecter" })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"]
})



export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const [registerUser] = useRegisterMutation()
    const onSubmit = async (data: z.infer<typeof formSchema>) => {

        console.log(data)
        try {
          const userData = {
            ...data,
            Available: true
          }

          console.log(userData)


          const response = await registerUser(userData).unwrap()
          console.log(response)
        } catch (error: unknown) {
          console.log(error)

        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Your Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Abdur Rahman" type="text" {...field} />
                                            </FormControl>
                                            <FormDescription className="sr-only">
                                                This is your public display name.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="arahman@gmail.com" type="email" {...field} />
                                            </FormControl>
                                            <FormDescription className="sr-only">
                                                This is your public display name.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Password {...field} />
                                            </FormControl>
                                            <FormDescription className="sr-only">
                                                This is your public display name.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Password {...field} />
                                            </FormControl>
                                            <FormDescription className="sr-only">
                                                This is your public display name.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full">Login</Button>
                            </form>
                        </Form>

                        <div className="text-center text-sm">
                            Do you have an account?{" "}
                            <Link to='/login' className="underline underline-offset-4">
                                Login
                            </Link>
                        </div>
                    </div>
                    <div className="py-5 after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                        <span className="bg-card text-muted-foreground relative z-10 px-2">
                            Or continue with
                        </span>
                    </div>
                    <div className="">
                        <Button
                            // http://localhost:5000/api/v1/auth/google
                            // onClick={() => window.open(`${config.baseUrl}/auth/google`)}
                            variant="outline" type="button" className="w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path
                                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                    fill="currentColor"
                                />
                            </svg>
                            <span className="sr-only">Login with Google</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
