
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useFirebase } from '@/context/firebase-provider';
import { ref, onValue, set as firebaseSet, off } from 'firebase/database';
import { siteContent as initialContentData } from '@/app/lib/content';
import { useToast } from '@/hooks/use-toast';
import cloneDeep from 'lodash.clonedeep';
import set from 'lodash.set';

type SiteContent = typeof initialContentData;

interface SiteContentContextType {
  content: SiteContent | null;
  isEditMode: boolean;
  editingSection: string | null;
  enterEditMode: () => void;
  exitEditMode: (save: boolean) => void;
  logout: () => void;
  handleContentChange: (path: string, value: any) => void;
  setEditingSection: (section: string | null) => void;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  const { database, dbConnection } = useFirebase();
  const [content, setContent] = useState<SiteContent | null>(null);
  const [originalContent, setOriginalContent] = useState<SiteContent | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const { toast } = useToast();

  const contentRef = database ? ref(database, '/') : null;

  useEffect(() => {
    const authStatus = localStorage.getItem('ulta-admin-authenticated');
    if (authStatus === 'true') {
      setIsEditMode(true);
    }
  }, []);

  useEffect(() => {
    if (dbConnection === 'connected' && contentRef) {
      const listener = onValue(contentRef, (snapshot) => {
        const data = snapshot.val();
        if (data && data.content) {
          setContent(data.content);
        } else {
          // If no data in DB, seed it with initial content
          firebaseSet(ref(database!, 'content'), initialContentData)
            .then(() => {
              setContent(initialContentData);
              toast({ title: 'Database seeded with initial content.' });
            })
            .catch(error => {
              console.error("Failed to seed database: ", error);
              toast({ variant: 'destructive', title: 'Failed to seed database.' });
            });
        }
      }, (error) => {
        console.error("Firebase read failed: ", error);
        toast({ variant: 'destructive', title: 'Failed to load site content.' });
      });

      return () => off(contentRef, 'value', listener);
    }
  }, [dbConnection, database, contentRef, toast]);

  const enterEditMode = () => {
    localStorage.setItem('ulta-admin-authenticated', 'true');
    setIsEditMode(true);
  };
  
  const logout = () => {
    localStorage.removeItem('ulta-admin-authenticated');
    setIsEditMode(false);
    setEditingSection(null);
    if(originalContent) {
      handleContentChange('', originalContent); // Revert all changes on logout
    }
    toast({ title: "You've been logged out." });
  }

  const handleContentChange = useCallback((path: string, value: any) => {
      if (!content) return;

      const newContent = cloneDeep(content);
      
      if (path) {
        set(newContent, path, value);
      } else {
        // If path is empty, replace the whole content
        Object.assign(newContent, value);
      }
      setContent(newContent);
    },
    [content]
  );
  
  const saveChanges = () => {
    if (!content || !database) return;
    const contentToSaveRef = ref(database, 'content');
    firebaseSet(contentToSaveRef, content)
      .then(() => {
        toast({ title: 'Content saved successfully!' });
        setOriginalContent(null);
      })
      .catch((error) => {
        console.error("Failed to save content: ", error);
        toast({ variant: 'destructive', title: 'Failed to save content.' });
      });
  };

  const cancelChanges = () => {
    if (originalContent) {
      setContent(originalContent);
      setOriginalContent(null);
    }
  }

  const exitEditMode = (save: boolean) => {
    if (save) {
      saveChanges();
    } else {
      cancelChanges();
    }
    setEditingSection(null);
  };

  const enterSectionEditing = (section: string | null) => {
    if (!isEditMode) return;
    if (section) {
      setOriginalContent(cloneDeep(content));
    }
    setEditingSection(section);
  }

  return (
    <SiteContentContext.Provider value={{ content, isEditMode, editingSection, enterEditMode, exitEditMode, logout, handleContentChange, setEditingSection: enterSectionEditing }}>
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);
  if (context === undefined) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
};
