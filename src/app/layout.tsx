import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './reset.css';
import './globals.css';
import Navigation from '@/components/navigation/Navigation';
import Providers from '@/components/providers';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'FitUp',
  description: 'FitUp - Home Page',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`flex flex-col h-screen w-screen ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <Navigation>{children}</Navigation>
        </Providers>
      </body>
    </html>
  );
}
