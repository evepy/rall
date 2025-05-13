"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
  useAuthenticate,
  useViewProfile,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Button } from "./components/DemoComponents";
import { Icon } from "./components/DemoComponents";
import { Onboarding } from './components/Onboarding';
import { MainView } from './components/MainView';

type UserRole = 'mentor' | 'learner';

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();
  const { signIn } = useAuthenticate('https://rall-six.vercel.app');
  const viewMyProfile = useViewProfile();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  useEffect(() => {
    const role = localStorage.getItem('userRole') as UserRole;
    if (role) {
      setUserRole(role);
    }
  }, []);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    setShowOnboarding(false);
  };

  const handleSignIn = useCallback(async () => {
    const result = await signIn();
    if (result) {
      console.log('Authenticated:', result);
      viewMyProfile();
    }
  }, [signIn, viewMyProfile]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddFrame}
          className="text-[var(--app-accent)] p-4"
          icon={<Icon name="plus" size="sm" />}
        >
          Save Frame
        </Button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-[#0052FF] animate-fade-out">
          <Icon name="check" size="sm" className="text-[#0052FF]" />
          <span>Saved</span>
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  if (showOnboarding) {
    return <Onboarding onRoleSelect={handleRoleSelect} />;
  }

  if (userRole) {
    return (
      <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
        <div className="w-full max-w-md mx-auto px-4 py-3">
          <header className="flex justify-between items-center mb-3 h-11">
            <div>
              <div className="flex items-center space-x-2">
                <Wallet className="z-10">
                  <ConnectWallet>
                    <Name className="text-inherit" />
                  </ConnectWallet>
                  <WalletDropdown>
                    <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                      <Avatar />
                      <Name />
                      <Address />
                      <EthBalance />
                    </Identity>
                    <WalletDropdownDisconnect />
                  </WalletDropdown>
                </Wallet>
              </div>
            </div>
            <div>{saveFrameButton}</div>
          </header>

          <main className="flex-1">
            <MainView userRole={userRole} />
          </main>

          <footer className="mt-2 pt-4 flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              className="text-[var(--ock-text-foreground-muted)] text-xs"
              onClick={() => openUrl("https://base.org/builders/minikit")}
            >
              Built on Base with MiniKit
            </Button>
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
      <div className="w-full max-w-md mx-auto px-4 py-3">
        <header className="flex justify-between items-center mb-3 h-11">
          <div>
            <div className="flex items-center space-x-2">
              <Wallet className="z-10">
                <ConnectWallet>
                  <Name className="text-inherit" />
                </ConnectWallet>
                <WalletDropdown>
                  <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                    <Avatar />
                    <Name />
                    <Address />
                    <EthBalance />
                  </Identity>
                  <WalletDropdownDisconnect />
                </WalletDropdown>
              </Wallet>
            </div>
          </div>
          <div>{saveFrameButton}</div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center space-y-6 py-12">
          <h1 className="text-2xl font-bold text-center">Web3 Mentorship</h1>
          <p className="text-center text-gray-600 max-w-sm">
            Conecta con mentores y aprendices en el mundo Web3. Comparte conocimiento y crece en comunidad.
          </p>
          <button
            onClick={() => setShowOnboarding(true)}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Comenzar
          </button>
          <Button variant="primary" onClick={handleSignIn}>
            Iniciar sesión con Farcaster
          </Button>
          <Button variant="secondary" size="sm" onClick={viewMyProfile}>
            Ver mi perfil
          </Button>
        </main>

        <footer className="mt-2 pt-4 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-[var(--ock-text-foreground-muted)] text-xs"
            onClick={() => openUrl("https://base.org/builders/minikit")}
          >
            Built on Base with MiniKit
          </Button>
        </footer>
      </div>
    </div>
  );
}
