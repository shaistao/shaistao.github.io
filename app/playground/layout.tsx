'use client';

import { useEffect } from 'react';

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.classList.add('playground');
    return () => document.body.classList.remove('playground');
  }, []);
  return <>{children}</>;
}
