import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

import { headers } from 'next/headers' // added
import ContextProvider from '@/context'
import { ToastContainer } from 'react-toastify'

export const metadata: Metadata = {
  title: 'ReCore Chain | Decentralized Energy ICO & Staking Blockchain',
  description: 'ReCore Chain is a decentralized blockchain platform focused on renewable energy, staking rewards, governance, and sustainable infrastructure powered by Web3 technology.',
  keywords: [
    'ReCore Chain',
    'Web3',
    'Blockchain',
    'Crypto',
    'Staking',
    'DeFi',
    'Renewable Energy Blockchain',
    'Decentralized Energy',
    'ICO',
    'Crypto Token'
  ],
  openGraph: {
    title: 'ReCore Chain | Decentralized Energy Blockchain',
    description:
      'Join ReCore Chain — A decentralized blockchain ecosystem powering renewable energy, staking rewards, and Web3 infrastructure.',
    url: 'https://recorechain.com',
    siteName: 'ReCore Chain',
    type: 'website'
  }
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {

  const headersObj = await headers();
  const cookies = headersObj.get('cookie')

  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider cookies={cookies}>
          {children}
          </ContextProvider>
          <ToastContainer theme='dark'/>
      </body>
    </html>
  )
}