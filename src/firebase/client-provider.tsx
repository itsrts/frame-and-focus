
'use client';

import React, { ReactNode } from 'react';
import { FirebaseProvider } from './provider';

// This component ensures that Firebase is only initialized on the client side.
export const FirebaseClientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <FirebaseProvider>{children}</FirebaseProvider>;
};
