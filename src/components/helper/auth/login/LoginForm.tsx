"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { LoginInput, loginSchema } from "@/lib/validators/auth/login/login";
import { LockKeyhole, User, EyeOff, Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { loginUser } from "@/services/auth.service";
import { useState } from "react";


export default function LoginPage(){
    const [show, setShow] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });

    const handleFinalSubmit = async (values: LoginInput) => {
    try {
        console.log(values);
        const data = await loginUser(values);
        console.log(data)
        toast.success(data.message || "Login successful");

        router.push("/dashboard");
    } catch (error: any) {
        toast.error(
            error instanceof Error
            ? error.message
            : "Login Failed"
        );
    }
    };

    return (
        <form onSubmit={handleSubmit(handleFinalSubmit)} className=" w-4/5 max-w-md lg:w-1/2 ">
            <Card className="w-full bg-linear-155 from-card to-[#6F78C7] from-80%">
                <CardHeader>
                    <CardTitle className="font-bold [font-variant:small-caps] text-2xl">
                        <Image src="/assets/favicon_io/favicon.ico" alt="logo" width={32} height={32} className="inline mr-2" />
                        MultiSpace
                    </CardTitle>
                    <CardDescription>Welcome back! Login into your workspace</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <div className="relative">
                            <Input {...register("email")} id="email" type="email" placeholder="test@example.com" className="placeholder:text-sm text-sm pl-8"/>
                            <User className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                        <p className="text-xs text-red-500 ">{errors.email?.message}</p>
                    </Field>
                    <Field>
                        <div className="flex justify-between items-center">
                            <FieldLabel htmlFor="password" className="">Password</FieldLabel>
                            <Link href="/forgot-password" className=" text-sm hover:underline">Forgot password?</Link>
                        </div>
                        <div id="password" className="relative">
                            <LockKeyhole className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <Input {...register("password")} type={show ? "text" : "password"} placeholder="********" className="placeholder:text-sm text-sm pr-16 pl-8"/>
                            <button
                                type="button"
                                onClick={() => setShow((s) => !s)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500"
                            >
                                {show ? <EyeOff className="p-1" /> : <Eye className=" p-1" />}
                            </button>
                        </div>
                        <p className="text-xs text-red-500 ">{errors.password?.message}</p>
                    </Field>
                    <div className="text-center space-y-4">
                        <Button
                            type="submit"
                            className="w-full p-4">
                            Login
                        </Button>
                        <div className="relative h-fit flex flex-col items-center justify-center">
                            <Separator />
                            <span className=" p-1 px-3 rounded-full absolute bg-card text-xs">or continue with</span>
                        </div>
                        <Button type="submit" variant="outline" className="w-full p-4">Continue with Google</Button>
                        <Link href="/register" className="text-xs">Don't have an account? <span className="hover:underline">Sign Up</span></Link>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
};