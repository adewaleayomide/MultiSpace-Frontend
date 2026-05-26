import LoginForm from "@/components/helper/auth/login/LoginForm.tsx";

export default function Login() {
    return (
        <main className="bg-white dark:bg-black min-h-screen max-h-fit w-full flex items-center justify-center py-8 sm:py-0">
            <LoginForm />
        </main>
    )
}