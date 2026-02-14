import { useState, useEffect } from 'react';

export interface InvitationDraft {
  inviterName: string;
  recipientName: string;
  message: string;
  date: string;
  time: string;
  location: string;
  closing: string;
}

const STORAGE_KEY = 'valentine-invitation-draft';

const defaultDraft: InvitationDraft = {
  inviterName: '',
  recipientName: '',
  message: '',
  date: '',
  time: '',
  location: '',
  closing: '',
};

function loadDraft(): InvitationDraft {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultDraft, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Failed to load draft:', error);
  }
  return defaultDraft;
}

function saveDraft(draft: InvitationDraft): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch (error) {
    console.error('Failed to save draft:', error);
  }
}

export function useDraftState() {
  const [draft, setDraft] = useState<InvitationDraft>(loadDraft);

  useEffect(() => {
    saveDraft(draft);
  }, [draft]);

  const updateDraft = (updates: Partial<InvitationDraft>) => {
    setDraft((prev) => ({ ...prev, ...updates }));
  };

  const clearDraft = () => {
    setDraft(defaultDraft);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { draft, updateDraft, clearDraft };
}
