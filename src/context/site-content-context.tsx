
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { siteContent as initialContentData } from '@/app/lib/content';
import { useToast } from '@/hooks/use-toast';
import set from 'lodash.set';
import cloneDeep from 'lodash.clonedeep';

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
  const [content, setContent] = useState<SiteContent | null>(null);
  const [originalContent, setOriginalContent] = useState<SiteContent | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    try {
      // Check for admin auth status
      const authStatus = localStorage.getItem('ulta-admin-authenticated');
      if (authStatus === 'true') {
        setIsEditMode(true);
      }

      // Load content from localStorage or initial data
      const storedContent = localStorage.getItem('siteContent');
      if (storedContent) {
        setContent(JSON.parse(storedContent));
      } else {
        setContent(initialContentData);
      }
    } catch (error) {
      console.error('Failed to parse content from localStorage', error);
      setContent(initialContentData);
      setIsEditMode(false);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'siteContent' && event.newValue) {
        try {
          setContent(JSON.parse(event.newValue));
        } catch (error) {
          console.error('Failed to parse content from storage event', error);
        }
      }
      if (event.key === 'ulta-admin-authenticated') {
        setIsEditMode(event.newValue === 'true');
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const enterEditMode = () => {
    setOriginalContent(cloneDeep(content));
    localStorage.setItem('ulta-admin-authenticated', 'true');
    setIsEditMode(true);
  };
  
  const logout = () => {
    localStorage.removeItem('ulta-admin-authenticated');
    setIsEditMode(false);
    setEditingSection(null);
    if(originalContent) {
      setContent(originalContent);
    }
    toast({ title: "You've been logged out." });
  }

  const exitEditMode = (save: boolean) => {
    if (save && content) {
      try {
        localStorage.setItem('siteContent', JSON.stringify(content));
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'siteContent',
          newValue: JSON.stringify(content)
        }));
        toast({ title: 'Content saved successfully!' });
      } catch (error) {
        toast({ variant: 'destructive', title: 'Failed to save content.' });
      }
    } else {
       if (originalContent) {
        setContent(originalContent);
      }
    }
    setEditingSection(null);
  };

  const handleContentChange = (path: string, value: any) => {
    if (!content) return;
     if (!originalContent) {
      setOriginalContent(cloneDeep(content));
    }
    const newContent = cloneDeep(content);
    set(newContent, path, value);
    setContent(newContent);
  };
  
  return (
    <SiteContentContext.Provider value={{ content, isEditMode, editingSection, enterEditMode, exitEditMode, logout, handleContentChange, setEditingSection }}>
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
