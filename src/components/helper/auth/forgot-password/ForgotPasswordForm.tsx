"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ForgotPasswordInput, forgotPasswordSchema } from "@/lib/validators/auth/forgot-password/forgotPassword";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Controller } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import { useRouter } from "next/navigation";
import Image from "next/image";
import { requestPasswordReset, resetPassword, verifyOtp } from "@/services/auth.service";



const steps = ["Request OTP", "Verify OTP", "Reset Password"];


export default function ForgotPasswordForm() {

    const [requestingOtp, setRequestingOtp] = useState(false);
    const [step, setStep] = useState(0);
    const [show, setShow] = useState(false)

    const router = useRouter();

    const [loading, setLoading] = useState(false); 
    
    const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
    const back = () => setStep((s) => Math.max(s - 1, 0));
    
    const [forgotPassword, setForgotPassword] = useState<ForgotPasswordInput | null>(null);

    const {
        register,
        trigger,
        getValues,
        setValue,
        control,
        watch,
        formState: { errors },
        } = useForm<ForgotPasswordInput>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
        otp: "",
        },
        });
        
    const handleFinalSubmit = async (
        data: ForgotPasswordInput
        ) => {
        const result = await resetPassword(data);
        router.push('/dashboard')

    return result;
    };

    const verifyOTP = async () => {
        // if (requestingOtp) return;
      try {
        setRequestingOtp(false);
        const valid = await trigger ( "otp");

        setLoading(true);
    
        const values = getValues();

        const data = await verifyOtp({
            email: forgotPassword?.email ?? "",
            otp: values.otp,
        });

        setForgotPassword(prev => ({
            ...prev!,
            otp: values.otp,
        }));

        toast.success(data.message || "OTP verified");

        next();
    
        // success
      } catch (error: any) {
        setValue("otp", "");
         toast.error(
            error instanceof Error
            ? error.message
            : "Invalid OTP"
  );

      } finally {
        setLoading(false);
      }
    };

    const otp = watch("otp");

    useEffect(() => {
        if (otp?.length === 6) {
            verifyOTP();
        }
    }, [otp]);



    return (
            <Card className=" w-4/5 max-w-md lg:w-1/2  bg-linear-155 from-card to-[#6F78C7] from-80%">
                <CardHeader>
                    <CardTitle className="font-bold [font-variant:small-caps] text-2xl">
                        <Image src="/assets/favicon_io/favicon.ico" alt="logo" width={32} height={32} className="inline mr-2" />
                        MultiSpace</CardTitle>
                    <CardDescription>
                        {step === 0 && (
                            <>Forgot your password? Insert you email to recover it</>
                        )}
                        {step === 1 && (
                            <>OTP sent to {getValues("email") || "your email"}. verify now.</>
                        )}
                        {step === 2 && (
                            <>Insert your new password</>
                        )}
                    </CardDescription>
                    {step === 1 && (
                        <CardAction onClick={
                            () => {
                                setRequestingOtp(false);
                                back()
                            }} className="hover:underline cursor-pointer py-4">
                            Change Email
                        </CardAction>
                    )}
                </CardHeader>
                <CardContent>
                    {step === 0 && (
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <div className="relative">
                            <Input {...register("email")} id="email" type="email" placeholder="johndoe21@example.com" className="placeholder:text-xs text-md pl-8" />
                            <Mail className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                        <p className="text-xs text-red-500 ">{errors.email?.message}</p>
                    </Field>
                    )}
                    {step === 1 && (
                        <div className="my-4 w-full flex items-center justify-center flex-col gap-8">
                            <Field className="w-fit">
                                <Controller
                                    name="otp"
                                    control={control}
                                    render={({ field }) => (
                                        <InputOTP
                                            maxLength={6}
                                            pattern={REGEXP_ONLY_DIGITS}
                                            value={field.value || ""}
                                            onChange={field.onChange}
                                            disabled={loading}>
                                            <InputOTPGroup >
                                                <InputOTPSlot index={0} className="w-10 h-14 sm:w-14 sm:h-18 text-2xl" />
                                                <InputOTPSlot index={1} className="w-10 h-14 sm:w-14 sm:h-18 text-2xl"/>
                                                <InputOTPSlot index={2} className="w-10 h-14 sm:w-14 sm:h-18 text-2xl" />
                                            </InputOTPGroup>
                                            <InputOTPSeparator />
                                            <InputOTPGroup>
                                                <InputOTPSlot index={3} className="w-10 h-14 sm:w-14 sm:h-18 text-2xl" />
                                                <InputOTPSlot index={4} className="w-10 h-14 sm:w-14 sm:h-18 text-2xl" />
                                                <InputOTPSlot index={5} className="w-10 h-14 sm:w-14 sm:h-18 text-2xl" />
                                            </InputOTPGroup>
                                        </InputOTP>
                                        )}>
                                </Controller>
                            </Field>
                            {/* <Button 
                            type="button"
                            onClick={verifyOtp}
                            className="w-full sm:w-1/2 p-4" disabled={loading}>
                                Verify OTP
                            </Button> */}
                        </div>

                    )}
                    {step === 2 && (
                        <>
                            <Field>
                                <FieldLabel htmlFor="password">New Password</FieldLabel>
                                <span className="relative w-full">
                                    <LockKeyhole className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <Input {...register("password") } id="password" type={show ? "text" : "password"} placeholder="********" className="placeholder:text-xs text-md pl-8" />
                                    <button
                                        type="button"
                                        onClick={() => setShow((s) => !s)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500"
                                    >
                                        {show ? <EyeOff className="p-1" /> : <Eye className=" p-1" />}
                                    </button>
                                </span>
                                <p className="text-xs text-red-500 ">{errors.password?.message}</p>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                                <span className="relative w-full">
                                    <LockKeyhole className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <Input {...register("confirmPassword")} id="confirm-password" type={show ? "text" : "password"} placeholder="********" className="placeholder:text-xs text-md pl-8" />
                                    <button
                                        type="button"
                                        onClick={() => setShow((s) => !s)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500"
                                    >
                                        {show ? <EyeOff className="p-1" /> : <Eye className=" p-1" />}
                                    </button>
                                </span>
                                <p className="text-xs text-red-500 ">{errors.confirmPassword?.message}</p>
                            </Field>
                        </>
                    )}
                </CardContent>
                
            {( step == 0 || step == 2) && (
              <CardFooter className="flex items-center justify-between">
              {step === 0 && (
                  <>
                    <Button type="button" variant="outline" className=" p-4 cursor-pointer" onClick={() => {
                        setRequestingOtp(false);
                        router.push("/login")}}>
                        Back
                    </Button>
                
                    <Button className="p-4 cursor-pointer"
                        type="button"
                        disabled={requestingOtp}
                        onClick={async() => {
                            if (requestingOtp) return;
                            const valid = await trigger ( "email");
                            if (valid) {
                                setRequestingOtp(true);
                              try {
                                const values = getValues();

                                const email = values.email;

                                setForgotPassword({
                                    email
                                } as ForgotPasswordInput);

                                const data = await requestPasswordReset(email);

                                toast.success(data.message);

                                next();
                                } catch (error: any) {
                                    
                                }
                            }
                          }}
                        >
                            {requestingOtp ? "Sending..." : "Request OTP"}
                    </Button>
                  </>
              )}
              {step === 2 && (
                <>
                    <Button className="p-4 cursor-pointer"
                        type="button"
                        disabled={requestingOtp}
                        onClick={ async () => {
                            if (requestingOtp) return;
                            try {
                                setRequestingOtp(true);
                                const valid = await trigger(["password", "confirmPassword"]);
                                
                                if (valid) {
                                    const values = getValues();

                                    const payload = {
                                        email: forgotPassword?.email ?? "",
                                        otp: forgotPassword?.otp ?? "",
                                        password: values.password,
                                        confirmPassword: values.confirmPassword,
                                    };

                                    await handleFinalSubmit(payload);
                                    toast.success("Password changed successfully");
                                } else {
                                    throw Error;
                                }
                            } catch (error: any) {
                                setRequestingOtp(false);
                                toast.error(
                                    error instanceof Error
                                    ? error.message
                                    : "Wrong input"
                                );
                            }
                            }}
                        >
                            Change Password
                    </Button>
                </>
              )}
            </CardFooter>
            )}
            </Card>
    )
}