import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    
    FormField,
    FormMessage,
    FormItem,
    FormLabel,
    FormControl,
    Form,
} from "@/components/ui/form";
import { useForm, type SubmitHandler } from "react-hook-form";
import Password from "./layout/Password";
import { Link } from "react-router";
import { useLoginMutation } from "@/redux/features/auth.api";
import { toast } from "sonner";
import config from "@/config";

type LoginRequest = {
    email: string;
    password: string;
};

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const form = useForm<LoginRequest>();
    const [loginUser] = useLoginMutation();

    const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
        try {
            const res = await loginUser(data).unwrap();
            // handle success, e.g. redirect
            console.log(res)
        } catch (error: any) {
            if ("data" in error && error.data) {
                toast.error(error.data.message || "Something went wrong");
            } else if ("message" in error) {
                toast.error(error.message);
            } else {
                toast.error("Something went wrong");
            }
        }
    };

    // Blur background styles
    return (
        <div
            className={cn(
                "w-full flex items-center justify-center bg-cover bg-center relative",
                className
            )}
            style={{
                // Optionally, you can set a background image here
                background: "url('/your-bg.jpg') center/cover no-repeat",
            }}
            {...props}
        >
            <div className="absolute inset-0 z-0" />
            <Card className="w-full  mx-auto relative z-10 shadow-2xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">
                        Log in to your account
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email:</FormLabel>
                                        <FormControl>
                                            <Input
                                            className="rounded-none p-6"
                                                placeholder="Email"
                                                type="email"
                                                required
                                                {...field}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password:</FormLabel>
                                        <FormControl>
                                            <Password
                                                {...field}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="w-full bg-[#373DD2] text-white font-semibold rounded-full py-2 text-base"
                            >
                                LOG IN
                            </Button>
                        </form>
                    </Form>

                    <div className="flex items-center gap-2 my-4">
                        <div className="flex-1 h-px bg-gray-300" />
                        <span className="text-gray-500 text-xs font-medium">Or</span>
                        <div className="flex-1 h-px bg-gray-300" />
                    </div>

                    {/* Only Google login button */}
                    <Button
                        variant="outline"
                        type="button"
                        className="w-full flex items-center justify-center gap-2 font-semibold rounded-full py-2"
                        onClick={() => window.open(`${config.baseUrl}/auth/google`)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M21.805 10.023h-9.785v3.978h5.676c-.245 1.273-1.478 3.743-5.676 3.743-3.417 0-6.193-2.828-6.193-6.317s2.776-6.317 6.193-6.317c1.949 0 3.26.828 4.012 1.545l2.741-2.662c-1.736-1.613-3.984-2.606-6.753-2.606-5.388 0-9.765 4.372-9.765 9.76s4.377 9.76 9.765 9.76c5.627 0 9.354-3.966 9.354-9.56 0-.642-.073-1.134-.162-1.599z"
                                fill="#EA4335"
                            />
                        </svg>
                        LOG IN WITH GOOGLE
                    </Button>

                    <div className="flex justify-between items-center mt-4 mb-2">
                        <Link
                            to="/forgot-password"
                            className="text-sm text-[#373DD2] hover:underline font-medium"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                    <div className="text-center text-sm mt-2">
                        New here?{" "}
                        <Link
                            to="/register"
                            className="text-[#373DD2] font-semibold hover:underline"
                        >
                            Sign Up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default LoginForm;