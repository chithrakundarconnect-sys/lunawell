import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { languages } from '@/lib/i18n/settings';
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: 'LunaWell',
  description: 'AI-Powered Women’s Health, Wellness & Self-Care Monitoring Platform',
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    lng: string;
  }
}>) {

  // ✅ FIXED (removed wrong use() hook)
  const { lng } = params;

  return (
    <html lang={lng} dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>

      <body className="font-body antialiased bg-background" suppressHydrationWarning>

        {/* 🔥 This activates Firebase Authentication across the app */}
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>

      </body>
    </html>
  );
}