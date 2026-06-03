import Aside from "@/components/helper/layout/aside";
import Header from "@/components/helper/layout/header";

export default function PlatformLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            <Aside />
            <div className="ml-64 flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}