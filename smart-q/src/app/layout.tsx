import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { QueueProvider } from "@/context/QueueContext";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Smart-Q",
  description: "Intelligent Queue & Appointment Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <QueueProvider>{children}</QueueProvider>
      </body>
    </html>
  );
}
