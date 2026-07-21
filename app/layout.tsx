import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import Header from '../components/Header/Header';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvader';

const inter = Inter({
    variable: '--font-inter',
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'TravelTrucks',
    description: 'Campers of your dreams',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className={inter.variable}>
            <body>
                <TanStackProvider>
                    <Header />
                    {children}
                </TanStackProvider>
            </body>
        </html>
    );
}
