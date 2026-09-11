import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
});

const sans = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Niecała — a walk through 230 metres of Kalisz",
  description:
    "A motion-animated walk down ulica Niecała in Kalisz: real buildings, real photographs, and the histories of the doll factory, the Orthodox church, the Lutheran house, Boretti, and Szolc-Rogoziński.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} h-full dark antialiased`}
    >
      <body className="min-h-full bg-[#120e0c] font-sans text-[#f4e8d8]">{children}</body>
    </html>
  );
}
