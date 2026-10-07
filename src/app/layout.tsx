import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { ToastProvider } from "@/components/ui/Toast";
import { getSiteUrl } from "@/lib/siteUrl";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Unspoken — Mental Health Support & Resources",
    template: "%s | Unspoken",
  },
  description:
    "A calm, private space for teens and young adults to reflect on how they're feeling, receive supportive guidance, and discover mental health resources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSans.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
