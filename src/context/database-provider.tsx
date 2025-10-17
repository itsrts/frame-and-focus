
'use client';

import React, { createContext, useContext, ReactNode, useCallback, useEffect } from 'react';
import { useFirebase } from '@/context/firebase-provider';
import { ref, onValue, set, update, remove, Unsubscribe } from 'firebase/database';
import { useToast } from '@/hooks/use-toast';

const APP_ID = process.env.NEXT_PUBLIC_APP_ID;

interface DatabaseContextType {
  dbConnection: 'connecting' | 'connected' | 'error';
  readData: (path: string, callback: (data: any) => void) => Unsubscribe | void;
  writeData: (path: string, data: any) => Promise<void>;
  updateData: (path: string, data: any) => Promise<void>;
  deleteData: (path: string) => Promise<void>;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const DatabaseProvider = ({ children }: { children: ReactNode }) => {
  const { database, dbConnection } = useFirebase();
  const { toast } = useToast();

  const getPath = useCallback((path: string) => {
    if (!APP_ID) {
      console.error('NEXT_PUBLIC_APP_ID is not set in environment variables.');
      toast({ variant: 'destructive', title: 'Configuration Error', description: 'App ID is not set.' });
      return '';
    }
    return `${APP_ID}/${path}`;
  }, [toast]);

  const readData = useCallback((path: string, callback: (data: any) => void): Unsubscribe | void => {
    if (!database) {
        toast({ variant: "destructive", title: "Database not connected." });
        return () => {};
    }
    const fullPath = getPath(path);
    if (!fullPath) return () => {};

    const dataRef = ref(database, fullPath);
    const listener = onValue(dataRef, (snapshot) => {
        callback(snapshot.val());
    }, (error) => {
        console.error(`Firebase read failed at path: ${path}`, error);
        toast({ variant: "destructive", title: "Failed to read data.", description: error.message });
    });

    return listener;
  }, [database, toast, getPath]);

  const writeData = useCallback(async (path: string, data: any) => {
    if (!database) {
        toast({ variant: "destructive", title: "Database not connected." });
        return;
    }
    const fullPath = getPath(path);
    if (!fullPath) return;

    const dataRef = ref(database, fullPath);
    await set(dataRef, data);
  }, [database, toast, getPath]);

  const updateData = useCallback(async (path: string, data: any) => {
    if (!database) {
        toast({ variant: "destructive", title: "Database not connected." });
        return;
    }
    const fullPath = getPath(path);
    if (!fullPath) return;
    
    const dataRef = ref(database, fullPath);
    await update(dataRef, data);
  }, [database, toast, getPath]);

  const deleteData = useCallback(async (path: string) => {
    if (!database) {
        toast({ variant: "destructive", title: "Database not connected." });
        return;
    }
    const fullPath = getPath(path);
    if (!fullPath) return;

    const dataRef = ref(database, fullPath);
    await remove(dataRef);
  }, [database, toast, getPath]);

  useEffect(() => {
    if (dbConnection === 'connected' && database && APP_ID) {
        const adminRef = ref(database, getPath('admin-password'));
        onValue(adminRef, (snapshot) => {
            if (!snapshot.exists()) { 
                console.log("Seeding admin password...");
                set(adminRef, 'your_secure_password')
                    .then(() => {
                        toast({ title: 'Admin password seeded in database.' });
                    })
                    .catch(error => {
                        console.error('Failed to seed admin password', error);
                        toast({ variant: 'destructive', title: 'Failed to seed password.'})
                    });
            }
        }, {
            onlyOnce: true
        });
    }
  }, [dbConnection, database, getPath, toast]);

  return (
    <DatabaseContext.Provider value={{ dbConnection, readData, writeData, updateData, deleteData }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};
