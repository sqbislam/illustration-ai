import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';

import './globals.css';

import ThemeToggler from '@/components/ThemeToggler';

import { AppStoreProvider } from '@/providers/app-provider';
import { ThemeProvider } from '@/providers/theme-provider';

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
      <Head>
        <title>Illustration AI</title>
      </Head>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <AppStoreProvider>
            <div className='flex flex-col justify-center items-center w-full relative'>
              <ThemeToggler />
              <div className='max-w-xl p-4 rounded-lg w-full'>
                <h1 className='text-3xl font-bold mb-4'>Illustration AI</h1>
                <p className='text-grawy-600 mb-6'>
                  Welcome to Illustrator AI. An open source free platform to
                  generate beautiful illustrations. Generate visually striking
                  illustrations from your text. Create beautiful illustrations
                  with just a few clicks and download them!
                </p>

                <div className='flex justify-center w-full'>{children}</div>
              </div>
            </div>
          </AppStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
