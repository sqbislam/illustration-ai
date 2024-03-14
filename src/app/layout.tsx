import { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const title = 'IllustratorAI - SVG Illustrations Generator';
const description = 'Generate your AI QR Code in seconds';
const url = 'https://localhost:3000/';
const ogimage = 'https://via.placeholder.com/300';
const sitename = 'Illustrator-AI.io';

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    images: [ogimage],
    title,
    description,
    url: url,
    siteName: sitename,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: [ogimage],
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='flex flex-col justify-center items-center h-screen w-full'>
          <div className='max-w-xl p-4 rounded-lg w-full'>
            <h1 className='text-3xl font-bold mb-4'>Illustration AI</h1>
            <p className='text-grawy-600 mb-6'>
              Welcome to our AI application. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua.
            </p>
            <div className='flex justify-center w-full'>{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
