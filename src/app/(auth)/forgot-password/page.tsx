import ForgotPasswordForm from "@/components/helper/auth/forgot-password/ForgotPasswordForm";

export const metadata = {
  title: "Forgot Password",
};

export default function ForgotPassword () {
    return (
        <main className="bg-[url('/assets/auth/MultiSpace-login-bg.png')] min-h-screen max-h-fit w-full flex items-center justify-center py-8 sm:py-0">
            <ForgotPasswordForm />
        </main>
    )
}