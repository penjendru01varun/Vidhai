
import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-lexend",
});

export const metadata: Metadata = {
    title: "Kalvi Kavalar - Student Portal",
    description: "Empowering Rural Girls through Education in Theni",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={lexend.className}>
                {children}
            </body>
        </html>
    );
}
