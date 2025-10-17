
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { siteContent as initialContentData } from '@/app/lib/content';
import { useToast } from '@/hooks/use-toast';
import cloneDeep from 'lodash.clonedeep';
import set from 'lodash.set';
import { useDatabase } from './database-provider';

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

const CONTENT_PATH = 'landing-page';

export const SiteContentProvider = ({ children, contentPath = CONTENT_PATH }: { children: ReactNode, contentPath?: string }) => {
  const { readData, writeData, dbConnection } = useDatabase();
  const [content, setContent] = useState<SiteContent | null>(null);
  const [originalContent, setOriginalContent] = useState<SiteContent | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const authStatus = sessionStorage.getItem('ulta-admin-authenticated');
    if (authStatus === 'true') {
      setIsEditMode(true);
    }
  }, []);

  useEffect(() => {
    if (dbConnection === 'connected') {
      const unsubscribe = readData(contentPath, (data) => {
        if (data) {
          setContent(data);
        } else {
          // If no data in DB, seed it with initial content
          writeData(contentPath, initialContentData)
            .then(() => {
              setContent(initialContentData);
              toast({ title: 'Database seeded with initial content.' });
            })
            .catch(error => {
              console.error("Failed to seed database: ", error);
              toast({ variant: 'destructive', title: 'Failed to seed database.' });
            });
        }
      });
      return () => {
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      };
    }
  }, [dbConnection, readData, writeData, toast, contentPath]);

  const enterEditMode = () => {
    sessionStorage.setItem('ulta-admin-authenticated', 'true');
    setIsEditMode(true);
  };
  
  const logout = () => {
    sessionStorage.removeItem('ulta-admin-authenticated');
    setIsEditMode(false);
    setEditingSection(null);
    if(originalContent) {
      setContent(originalContent);
    }
    toast({ title: "You've been logged out." });
  }

  const handleContentChange = useCallback((path: string, value: any) => {
      if (!content) return;
      const newContent = cloneDeep(content);
      set(newContent, path, value);
      setContent(newContent);
    },
    [content]
  );
  
  const saveChanges = () => {
    if (!content) return;
    writeData(contentPath, content)
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
