'use client'


import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import { bsc, bscTestnet } from '@reown/appkit/networks'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'
import { projectId, wagmiAdapter } from '@/configs'

// Set up queryClient
const queryClient = new QueryClient()

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Set up metadata
const metadata = {
  name: 'ReCore Chain | Decentralized Energy ICO & Staking Blockchain',
  description: 'ReCore Chain is a decentralized blockchain platform focused on renewable energy, staking rewards, governance, and sustainable infrastructure powered by Web3 technology.',
  url: 'https://recorechain', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [bsc],
  defaultNetwork: bsc,
  metadata: metadata,
  themeMode: 'light',
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    swaps: false,
    socials: false,
    email: false,
    onramp: false,

  },


})

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider