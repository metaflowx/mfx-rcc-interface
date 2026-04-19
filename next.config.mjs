/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // These are optional peer dependencies of @wagmi/connectors and @wagmi/core
    // that are dynamically imported with catch blocks. We resolve them to false
    // so webpack doesn't error and the runtime catch handlers work correctly.
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'accounts': false,
      '@coinbase/wallet-sdk': false,
      '@metamask/connect-evm': false,
      'porto': false,
      'porto/internal': false,
      '@walletconnect/ethereum-provider': false,
      '@safe-global/safe-apps-provider': false,
      '@safe-global/safe-apps-sdk': false,
      '@base-org/account': false,
    };
    return config;
  },
};

export default nextConfig;
