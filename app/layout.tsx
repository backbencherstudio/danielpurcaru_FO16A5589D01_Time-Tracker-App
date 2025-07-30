import type { Metadata } from "next";
import "./globals.css";
import { AppConfig } from "@/config/app.config";
import { Urbanist } from 'next/font/google';
import ProtectedPageWrapper from "@/components/ProtectedPageWrapper/ProtectedPageWrapper";
import Script from "next/script";

export const metadata: Metadata = {
  title: AppConfig().app.name,
  description: AppConfig().app.slogan,
};

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={urbanist.className}>
      <body className="bg-white flex justify-center">
        <div id="google_translate_element" style={{ display: "hidden" }}></div>
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,es,pt',
                autoDisplay: false
              }, 'google_translate_element');
            }
          `}
        </Script>

        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
            <ProtectedPageWrapper>
              {children}
            </ProtectedPageWrapper>
      </body>
    </html>
  );
}