import type { Metadata } from "next";
import { ThemeProvider } from "@/components/boxed/ThemeProvider";
import localFont from "next/font/local"
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import './i18n';
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Sunny_ZY's website",
  description: "Personal website of Sunny_ZY",
  icons: {
    icon: "/favicon.ico"
  }
};

// 导入Playpen Sans字体
const playpenSans = localFont({
  src: [
    { path: '../fonts/Playpen_Sans/PlaypenSans-VariableFont_wght.ttf' }
  ],
  variable: '--font-playpen-sans'
})

// 导入Kiwi Maru字体
const kiwiMaru = localFont({
  src: [
    { path: '../fonts/Kiwi_Maru/KiwiMaru-Light.ttf', weight: '300' },
    { path: '../fonts/Kiwi_Maru/KiwiMaru-Regular.ttf', weight: '400' },
    { path: '../fonts/Kiwi_Maru/KiwiMaru-Medium.ttf', weight: '500' }
  ],
  variable: '--font-kiwi-maru'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body className={`${playpenSans.className} ${kiwiMaru.className}`}>
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}