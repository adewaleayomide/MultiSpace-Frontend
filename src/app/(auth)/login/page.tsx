import LoginPage from "@/components/helper/auth/login/LoginForm.tsx";

export const metadata = {
  title: "Login",
};

export default function Login() {
    return (
        <main className="bg-[url('/assets/auth/MultiSpace-login-bg.png')] min-h-screen max-h-fit w-full flex items-center justify-center py-8 sm:py-0">
            <LoginPage />
        </main>
    )
}