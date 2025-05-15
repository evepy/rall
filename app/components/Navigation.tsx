'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, ChevronDown, ArrowLeft } from 'lucide-react';

const navigationItems = [
  { label: 'Mensajería', href: '/chat' },
  { label: 'Actividad', href: '/profile/activity' },
];

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const showBackButton = !['/', '/chat', '/profile/activity'].includes(pathname);

  return (
    <nav className="bg-white border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {showBackButton && (
              <button
                onClick={() => router.back()}
                className="mr-4 p-2 hover:bg-[#E2FF5C] border-2 border-black rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            )}
            <Link href="/" className="font-bold text-xl">
              BaseLatam
            </Link>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-[#E2FF5C] border-4 border-black hover:bg-[#d4ff2a] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <Menu className="w-5 h-5" />
              <span>Menú</span>
              <ChevronDown className="w-5 h-5" />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-2 hover:bg-[#E2FF5C] transition-colors ${
                      pathname === item.href ? 'bg-[#E2FF5C]' : ''
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}; 