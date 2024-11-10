import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ecommerce Assessment",
  description: "Created by Syed Mohammed Hassan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased m-0 p-5]`}>
        <header className="py-5">
          <Link className="font-semibold text-blue-600" href="/customers">
            Customers
          </Link>
        </header>
        <hr className="pb-5" />
        <main>
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              duration: 3000,
              style: {
                borderRadius: "8px",
                background: "#333",
                color: "#fff",
              },
            }}
          />
          {children}
        </main>
      </body>
    </html>
  );
}
