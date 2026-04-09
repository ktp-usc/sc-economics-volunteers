import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import Header from "@/components/header";
import PageTransition from "@/components/PageTransition";
import { NavigationProvider } from "@/context/navigation";
import Footer from "@/components/footer";

export const metadata: Metadata = {
    title: "SC Economics Volunteer",
    description: "SC Economics Volunteer Management System",
};

export default function RootLayout({children,}: Readonly<{
    children: React.ReactNode;
}>): React.JSX.Element { // Changed from Element to React.JSX.Element
    return (
        <html lang="en">
        <body className="flex flex-col min-h-screen">
        <NavigationProvider>
            <Header />
            <PageTransition>
                <main className="flex-1">{children}</main>
            </PageTransition>
            <Footer />
        </NavigationProvider>
        </body>
        </html>
    );

}