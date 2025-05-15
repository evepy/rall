"use client";

import { type ReactNode } from "react";
import { base, baseSepolia } from "wagmi/chains";
import { MiniKitProvider } from "@coinbase/onchainkit/minikit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { config as wagmiAppConfig, wagmiAdapter, projectId as reownProjectId } from "../lib/reownConfig";
import { createAppKit } from "@reown/appkit/react";

const metadata = {
  name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || 'Rall App',
  description: 'Web3 Mentorship Platform by Rall',
  url: process.env.NEXT_PUBLIC_URL || 'https://rall-six.vercel.app',
  icons: [process.env.NEXT_PUBLIC_ICON_URL || 'https://assets.reown.com/reown-profile-pic.png'],
};

if (reownProjectId) {
  createAppKit({
    adapters: [wagmiAdapter],
    projectId: reownProjectId,
    networks: [base, baseSepolia],
    defaultNetwork: baseSepolia,
    metadata: metadata,
    features: {
    }
  });
} else {
  console.warn("Reown AppKit not initialized due to missing NEXT_PUBLIC_PROJECT_ID.")
}

export function Providers(props: { children: ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={wagmiAppConfig}>
      <QueryClientProvider client={queryClient}>
        <MiniKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={base}
          config={{
            appearance: {
              mode: "auto",
              theme: "mini-app-theme",
              name: metadata.name,
              logo: metadata.icons[0],
            },
          }}
        >
          {props.children}
        </MiniKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}


