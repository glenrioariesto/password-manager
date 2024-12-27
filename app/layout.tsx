import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { Home, PlusCircle, Settings } from "lucide-react";
import ThemeToggle from "./components/ThemeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Password Manager",
  description: "A secure password management application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <header className="bg-primary dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <h1 className="text-xl font-bold text-primary-foreground">Password Manager</h1>
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-grow">{children}</main>
          <nav className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 fixed bottom-0 left-0 right-0 z-10 md:relative md:border-t-0 md:border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between md:justify-start">
                <Button
                  variant="ghost"
                  className="flex-1 py-4 text-sm font-medium text-center md:flex-initial"
                >
                  <Home className="h-5 w-5 mx-auto md:mr-2" />
                  <span className="sr-only md:not-sr-only">Passwords</span>
                </Button>
                <Button
                  variant="ghost"
                  className="flex-1 py-4 text-sm font-medium text-center md:flex-initial"
                >
                  <PlusCircle className="h-5 w-5 mx-auto md:mr-2" />
                  <span className="sr-only md:not-sr-only">Add</span>
                </Button>
                <Button
                  variant="ghost"
                  className="flex-1 py-4 text-sm font-medium text-center md:flex-initial"
                >
                  <Settings className="h-5 w-5 mx-auto md:mr-2" />
                  <span className="sr-only md:not-sr-only">Settings</span>
                </Button>
              </div>
            </div>
          </nav>
        </div>
      </body>
    </html>
  );
}
