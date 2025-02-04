import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './styles/globals.css';

import { Bold } from 'react-feather';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Auth2',
  description: 'how can create auth in Next',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased layout`}>
        <header className="flex align-center justify-between py-5">
          <a href="/">
            <Bold color="#fff" size="22" />
          </a>
        </header>
        {children}
        <footer></footer>
      </body>
    </html>
  );
}
