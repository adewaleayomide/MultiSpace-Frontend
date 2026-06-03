import RegisterForm from "@/components/helper/auth/register/RegisterForm.tsx";

export const metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <main className="bg-[url('/assets/auth/MultiSpace-login-bg.png')] min-h-screen max-h-fit w-full flex items-center justify-center py-8 sm:py-0">
      <RegisterForm />
    </main>
  );
}