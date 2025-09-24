import type { Metadata } from "next";
import { ThemeProvider } from "@/components/boxed/ThemeProvider";
import 'bootstrap/dist/css/bootstrap.min.css'
import './i18n';
import Header from "@/components/layout/Header";
export const metadata: Metadata = {
  title: "Sunny_ZY's website",
  description: "Personal website of Sunny_ZY",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <html lang="en">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <body>
          <Header />
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}
