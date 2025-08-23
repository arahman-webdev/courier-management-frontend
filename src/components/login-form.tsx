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
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form"
import Password from "./layout/Password"
import { Link } from "react-router"
import { useLoginUserMutation } from "@/redux/features/auth/auth.api"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const [loginUser] = useLoginUserMutation()


    const form = useForm()


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const res = await loginUser(data).unwrap()
            console.log(res)
        } catch (error) {
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
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Your Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="email" type="email" required {...field} value={field.value || ""} />
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
                                            <FormLabel>Your Password</FormLabel>
                                            <FormControl>
                                                <Password {...field}  value={field.value || ""} />
                                            </FormControl>
                                            <FormDescription className="sr-only">
                                                This is your public display name.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid gap-6">
                                    <Button type="submit" className="w-full">
                                        Login
                                    </Button>
                                </div>
                            </form>
                        </Form>

                        <div className="text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link to='/register' className="underline underline-offset-4">
                                Sign up
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
