'use client';

import React from 'react';
import { ThemeSwitcher } from './theme-switcher';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          SkillCred
        </Link>
        
        <div className="flex items-center gap-4">
          {/* ...existing nav items... */}
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
