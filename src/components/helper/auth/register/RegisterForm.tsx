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
import { Eye, EyeOff } from "lucide-react";
import { Spinner } from "../../../ui/spinner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "@/lib/validators/register.ts";
import CreateWorkspaceForm from "./CreateWorkspaceForm";
import JoinWorkspaceForm from "./JoinWorkspaceForm";
import { JoinWorkspaceInput } from "@/lib/validators/joinWorkspace";
import { CreateWorkspaceInput } from "@/lib/validators/createWorkspace";

const steps = ["Account", "Workspace Choice", "Workspace Details"];



export default function RegisterForm() {
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(false);

  const [workspaceMode, setWorkspaceMode] = useState<"create" | "join" | null>(null);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterInput) => {
    console.log("VALID DATA:", data);
    // send to API later
  };

  const [accountData, setAccountData] = useState<{
    name: string;
    email: string;
    password: string;
  } | null>(null);
  const [workspaceData, setWorkspaceData] = useState<CreateWorkspaceInput | null>(null);
  const [joinData, setJoinData] = useState<JoinWorkspaceInput | null>(null);

  const handleFinalSubmit = async () => {
    const payload = {
      account: accountData,
      workspace:
        workspaceMode === "create" ? workspaceData : joinData,
    };

    console.log(payload);
  };

  // const { getValues } = useForm();

  return (
    
    <div className="flex flex-col items-center w-full">
        <div className="flex items-center justify-between relative w-full max-w-md mb-8">
            
            {/* Background line */}
            <div className="absolute top-4 left-0 w-full h-1 bg-gray-200" />

            {/* Active line */}
            <div
            className="absolute top-4 left-0 h-1 bg-black transition-all duration-300"
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
                        ? "bg-black text-white border-2 border-white cursor-pointer"
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
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex items-center justify-center">

          <Card className="w-4/5 max-w-md lg:w-1/2">
            <CardHeader>
              <CardTitle className="text-2xl"><h2>MultiSpace</h2></CardTitle>
              <CardDescription>
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
              {step === 1 && (
                <CardAction>
                  <Button variant="outline" onClick={() => {
                    setWorkspaceMode(null);
                    next(); // Fix this to jump to the website
                  }}>
                    Skip
                  </Button>
                </CardAction>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {step === 0 && (
                <>
                  <Field>
                    <FieldLabel>Name</FieldLabel>
                    <Input {...register("name")}  placeholder="John Doe" className="placeholder:text-xs text-md" />
                    <p className="text-xs text-red-500 mt-1">{errors.name?.message}</p>
                  </Field>
                  <Field>
                    <FieldLabel>Email</FieldLabel>
                    <Input {...register("email")} type="email" placeholder="johndoe21@example.com" className="placeholder:text-xs text-md" />
                    <p className="text-xs text-red-500 mt-1">{errors.email?.message}</p>
                  </Field>
                  <Field>
                    <FieldLabel>Password</FieldLabel>
                    <span className="relative w-full">
                      <Input {...register("password")} type={show ? "text" : "password"} placeholder="********" className="placeholder:text-xs pr-16 text-md" />
                      <button
                          type="button"
                          onClick={() => setShow((s) => !s)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500"
                      >
                          {show ? <EyeOff className="p-1" /> : <Eye className=" p-1" />}
                      </button>
                    </span>
                    <p className="text-xs text-red-500 mt-1">{errors.password?.message}</p>
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
                    {workspaceMode === "create" && <CreateWorkspaceForm next={next} back={back} onComplete={(data) => {
                      setWorkspaceData(data);
                      next(); // Later redirect this to the main website
                    }}/>}
                    {workspaceMode === "join" && <JoinWorkspaceForm next={next} back={back} onComplete={(data) => {
                      setJoinData(data),
                      next(); // Later redirect to the main website 
                    }}/>}
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
                            const valid = await trigger (["name", "email", "password"]);
                            if (valid) {
                              const values = getValues();
                              setAccountData({
                                name: values.name,
                                email: values.email,
                                password: values.password,
                              });
                              next();
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
        </form>
    </div>
  );
}