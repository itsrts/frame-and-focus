
'use client';

import React, { createContext, useContext, ReactNode, useCallback, useEffect } from 'react';
import { useFirebase } from '@/context/firebase-provider';
import { ref, onValue, set, update, remove, Unsubscribe } from 'firebase/database';
import { useToast } from '@/hooks/use-toast';

interface DatabaseContextType {
  dbConnection: 'connecting' | 'connected' | 'error';
  readData: (path: string, callback: (data: any) => void) => Unsubscribe;
  writeData: (path: string, data: any) => Promise<void>;
  updateData: (path: string, data: any) => Promise<void>;
  deleteData: (path: string) => Promise<void>;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const DatabaseProvider = ({ children }: { children: ReactNode }) => {
  const { database, dbConnection } = useFirebase();
  const { toast } = useToast();

  const readData = useCallback((path: string, callback: (data: any) => void): Unsubscribe => {
    if (!database) {
        toast({ variant: "destructive", title: "Database not connected." });
        return () => {};
    }
    const dataRef = ref(database, path);
    const listener = onValue(dataRef, (snapshot) => {
        callback(snapshot.val());
    }, (error) => {
        console.error(`Firebase read failed at path: ${path}`, error);
        toast({ variant: "destructive", title: "Failed to read data." });
    });

    return listener;
  }, [database, toast]);

  const writeData = useCallback(async (path: string, data: any) => {
    if (!database) {
        toast({ variant: "destructive", title: "Database not connected." });
        return;
    }
    const dataRef = ref(database, path);
    await set(dataRef, data);
  }, [database, toast]);

  const updateData = useCallback(async (path: string, data: any) => {
    if (!database) {
        toast({ variant: "destructive", title: "Database not connected." });
        return;
    }
    const dataRef = ref(database, path);
    await update(dataRef, data);
  }, [database, toast]);

  const deleteData = useCallback(async (path: string) => {
    if (!database) {
        toast({ variant: "destructive", title: "Database not connected." });
        return;
    }
    const dataRef = ref(database, path);
    await remove(dataRef);
  }, [database, toast]);

  useEffect(() => {
    if (dbConnection === 'connected') {
        readData('admin', (data) => {
            if (!data || !data.password) {
                writeData('admin', { password: 'your_secure_password' })
                    .then(() => {
                        toast({ title: 'Admin password seeded in database.' });
                    })
                    .catch(error => {
                        console.error('Failed to seed admin password', error);
                    });
            }
        });
    }
  }, [dbConnection, readData, writeData, toast]);

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
