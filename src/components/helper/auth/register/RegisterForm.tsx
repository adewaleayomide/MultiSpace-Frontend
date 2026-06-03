"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react";
import { Spinner } from "../../../ui/spinner";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "@/lib/validators/auth/register/register";
import CreateWorkspaceForm from "./CreateWorkspaceForm";
import JoinWorkspaceForm from "./JoinWorkspaceForm";
import Image from "next/image";
import { toast } from "sonner";
import { registerUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";

const steps = ["Account", "Workspace Choice", "Workspace Details"];



export default function RegisterForm() {

  const router = useRouter();

  const [step, setStep] = useState(0);
  const [show, setShow] = useState(false);

  const [workspaceMode, setWorkspaceMode] = useState<"create" | "join" | null>(null);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });


  const [accountData, setAccountData] = useState<{
    displayName: string;
    username: string;
    email: string;
    password: string;
  } | null>(null);
  


  return (
    
    <div className="flex flex-col items-center w-full">
        <div className="flex items-center justify-between relative w-full max-w-md mb-8">
            
            {/* Background line */}
            <div className="absolute top-4 left-0 w-full h-1 bg-transparent" />

            {/* Active line */}
            <div
            className="absolute top-4 left-0 h-1 bg-gray-200 transition-all duration-300"
            style={{
                width: `${(step / (steps.length - 1)) * 100}%`,
            }}
            />

            {steps.map((label, index) => {
            const isActive = index <= step;
            const isCurrent = index === step;

            return (
                <div key={label} className="flex flex-col items-center z-10 w-full">
                
                {/* Circle */}
                <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all
                    ${
                        isActive
                        ? "bg-card text-white border-2 border-white cursor-pointer"
                        : "bg-gray-200 text-gray-500"
                    }
                    ${isCurrent ? "scale-110" : ""}
                    `}
                    onClick={() =>{
                      back();
                    }}
                >
                    {index + 1}
                </div>

                {/* Label */}
                <p className="text-xs mt-2 text-center text-gray-600">
                    {label}
                </p>
                </div>
            );
            })}
        </div>
        <div className="w-full flex items-center justify-center">

          <Card className="w-4/5 max-w-md lg:w-1/2 bg-linear-155 from-card to-[#6F78C7] from-80%">
            <CardHeader>
                <CardTitle className="font-bold [font-variant:small-caps] text-2xl">
                    <Image src="/assets/favicon_io/favicon.ico" alt="logo" width={32} height={32} className="inline mr-2" />
                    MultiSpace
                </CardTitle>
                <CardDescription className="">
                {step === 0 && (
                  <span> Create an account now to get started!</span>
                )}
                {
                  step === 1 && (
                    <span> Select between two boxes </span>
                  )
                }
                {step === 2 && (
                  <span> Set up your workspace and collaborate with your team</span>
                )}
              </CardDescription>
              {step === 0 && (
              <CardAction className=" h-full flex items-center">
                <Link href="/login" className="hover:underline ">Log In</Link>
              </CardAction>
              )}
              {step === 1 && (
                <CardAction>
                  <Button variant="outline" onClick={ () => {
                    router.push("/dashboard")
                  }}>
                    Skip
                  </Button>
                </CardAction>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {step === 0 && (
                <>
                  <div className="flex gap-2">
                    <Field>
                      <FieldLabel htmlFor="displayName">Name</FieldLabel>
                      <div className="relative">
                        <Input {...register("displayName")}  id="displayName" placeholder="John Doe" className="placeholder:text-xs text-md pl-8" />
                        <User className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      </div>
                      <p className="text-xs text-red-500 ">{errors.displayName?.message}</p>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="username">Username</FieldLabel>
                      <div className="relative">
                        <Input {...register("username")}  id="username" placeholder="john_doe" className="placeholder:text-xs text-md pl-8" />
                        <User className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      </div>
                      <p className="text-xs text-red-500 ">{errors.username?.message}</p>
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <div className="relative">
                      <Input {...register("email")} id="email" type="email" placeholder="johndoe21@example.com" className="placeholder:text-xs text-md pl-8" />
                      <Mail className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                    </div>
                    <p className="text-xs text-red-500 ">{errors.email?.message}</p>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <span className="relative w-full">
                      <LockKeyhole className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <Input {...register("password")} id="password" type={show ? "text" : "password"} placeholder="********" className="placeholder:text-xs pl-8 pr-16 text-md
                      " />
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
                </>
              )}
              {step === 1 && (
                <>
                  <Card onClick={() => {
                    setWorkspaceMode("create")
                    next();
                    }} className="cursor-pointer hover:scale-101 transition duration-200 ease-in-out">
                    <CardContent className="flex items-center justify-center flex-col py-6 text-center">
                      <h3 className="text-lg font-semibold mb-2">Create New Workspace</h3>
                      <p className="text-sm text-gray-500">Set up a new workspace for you and your team to collaborate.</p>
                    </CardContent>
                  </Card>
                  <Card onClick={() => {
                    setWorkspaceMode("join")
                    next();
                    }} className="cursor-pointer hover:scale-101 transition duration-200 ease-in-out">
                    <CardContent className="flex items-center justify-center flex-col py-6 text-center ">
                      <h3 className="text-lg font-semibold mb-2">Join Existing Workspace</h3>
                      <p className="text-sm text-gray-500">Join an existing workspace to collaborate with your team.</p>
                    </CardContent>
                  </Card>
                </>
              )}
              {step === 2 && (
                <> 
                    {workspaceMode === "create" && <CreateWorkspaceForm back={back} onNext={next} />}
                    {workspaceMode === "join" && <JoinWorkspaceForm back={back} onNext={next} />}
                </>
              )}
            </CardContent>
            {( step < 1 ) && (
              <CardFooter className="flex flex-col gap-2">
              {step === 0 && (
                  <>
                      <Button className="w-full  p-4 cursor-pointer"
                          type="button"
                          onClick={async() => {
                            const valid = await trigger([
                              "username",
                              "displayName",
                              "email",
                              "password",
                            ]);

                            if (!valid) return;

                            const values = getValues();

                            const payload = {
                              displayName: values.displayName,
                              username: values.username,
                              email: values.email,
                              password: values.password,
                            };

                            try {
                              const data = await registerUser(payload);

                              toast.success(data.message);

                              setAccountData(payload);

                              next();
                            } catch (error: any) {
                              toast.error(
                                error instanceof Error
                                  ? error.message
                                  : "Account creation failed"
                              );
                            }
                          }}
                          >
                              Register
                      </Button>
                      <Button variant="outline" className="w-full  p-4 cursor-pointer">Continue with Google</Button>
                  </>
              )}
            </CardFooter>
            )}
          </Card>
        </div>
    </div>
  );
}