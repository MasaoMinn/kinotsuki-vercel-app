'use client';
import { useTheme, darkTheme, lightTheme } from '@/components/boxed/ThemeProvider';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const { theme, currentTheme } = useTheme();
  // 确保主题样式只在客户端应用
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="container mx-auto px-4 py-16 text-center" style={isClient ? (theme === 'light' ? { ...lightTheme[currentTheme] } : { ...darkTheme[currentTheme] }) : undefined}>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">404 Not Found</h1>
      <Image src="/mainpage/404.png" alt="404 Not Found" width={404} height={404} />
      <p className="text-gray-500 mb-8 max-w-md mx-auto">
        Sorry, the page you are looking for doesn`t exist or has been moved.
      </p>
      <Link
        href="/"
      >
        Return to Home
      </Link>
    </div>
  );
}