// // components/providers/Providers.tsx
// 'use client';

// import React from 'react';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
 
// import { AppKitProvider } from '@reown/appkit/react'; // ✅ Use AppKitProvider instead of WagmiProvider
// import { appKit } from './appkit';

// const queryClient = new QueryClient();

// export function Providers({ children }: { children: React.ReactNode }) {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <AppKitProvider appKit={appKit}>
//         {children}
//       </AppKitProvider>
//     </QueryClientProvider>
//   );
// }
