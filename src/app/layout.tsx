import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThirdwebProvider } from 'thirdweb/react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Simple IPFS upload',
  description: 'Upload files to IPFS and retrieve them using their CID',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThirdwebProvider>{children}</ThirdwebProvider>
      </body>
    </html>
  );
}
