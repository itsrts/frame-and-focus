
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Database, getDatabase, ref, onValue, off } from 'firebase/database';

import { getFirebaseConfig } from '@/firebase/config';

type DbConnectionStatus = 'connecting' | 'connected' | 'error';

interface FirebaseContextType {
  app: FirebaseApp | null;
  auth: Auth | null;
  database: Database | null;
  dbConnection: DbConnectionStatus;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

let firebaseApp: FirebaseApp;
if (!getApps().length) {
  const firebaseConfig = getFirebaseConfig();
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0];
}

export const FirebaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [database, setDatabase] = useState<Database | null>(null);
  const [dbConnection, setDbConnection] = useState<DbConnectionStatus>('connecting');

  useEffect(() => {
    if (firebaseApp) {
      setAuth(getAuth(firebaseApp));
      const db = getDatabase(firebaseApp);
      setDatabase(db);

      const connectedRef = ref(db, '.info/connected');
      const listener = onValue(connectedRef, (snap) => {
        if (snap.val() === true) {
          setDbConnection('connected');
        } else {
          // It might be connecting initially, so we don't immediately set to 'error'
          // We let the initial state be 'connecting'
        }
      }, (error) => {
        console.error("Firebase connection error:", error);
        setDbConnection('error');
      });

      // Set a timeout to handle cases where connection is not established
      const timeout = setTimeout(() => {
        if (dbConnection === 'connecting') {
           console.error("Firebase connection timed out.");
           setDbConnection('error');
        }
      }, 5000); // 5 seconds timeout

      return () => {
        off(connectedRef, 'value', listener);
        clearTimeout(timeout);
      };
    }
  }, [dbConnection]);

  const value = { app: firebaseApp, auth, database, dbConnection };

  return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>;
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
