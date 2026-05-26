import RegisterForm from "@/components/helper/auth/register/RegisterForm.tsx";

export default function RegisterPage() {
  return (
    <main className="bg-white dark:bg-black min-h-screen max-h-fit w-full flex items-center justify-center py-8 sm:py-0">
      <RegisterForm />
    </main>
  );
}