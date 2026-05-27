import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NotificationScheduler } from "@/components/notification-scheduler";
import Script from "next/script";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "Stux - Supere a Procrastinação",
  description: "App de ofensiva para estudantes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={openSans.variable} suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var s=JSON.parse(localStorage.getItem('stux-storage')||'{}');if(s.state&&s.state.theme==='dark')document.documentElement.classList.add('dark')}catch(e){}})()`}
        </Script>
      </head>
      <body
        className="font-sans antialiased"
      >
        <TooltipProvider>
          <SidebarProvider>
            <AppSidebar />
            <div className="flex-1 min-h-screen overflow-hidden relative">
              <div className="md:hidden fixed top-3 left-3 z-40">
                <SidebarTrigger className="h-8 w-8 bg-background shadow-md border rounded-lg" />
              </div>
              <div className="h-full overflow-auto pt-10 md:pt-0">
                {children}
              </div>
            </div>
          </SidebarProvider>
          <NotificationScheduler />
        </TooltipProvider>
      </body>
    </html>
  );
}
