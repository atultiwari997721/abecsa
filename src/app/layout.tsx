import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abecsa - Professional Website Templates",
  description: "Discover premium website templates for your next project. Professional designs, expert support, and instant downloads.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">
          <CartProvider>
            <main className="min-h-screen">
              {children}
            </main>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
