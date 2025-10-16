// Hook personalizado para armazenamento
import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export const useStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadValue();
  }, [key]);

  const loadValue = async () => {
    try {
      const storedValue = await storage.getItem<T>(key);
      if (storedValue !== null) {
        setValue(storedValue);
      }
    } catch (error) {
      console.error('Error loading from storage:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveValue = async (newValue: T) => {
    try {
      await storage.setItem(key, newValue);
      setValue(newValue);
    } catch (error) {
      console.error('Error saving to storage:', error);
      throw error;
    }
  };

  const removeValue = async () => {
    try {
      await storage.removeItem(key);
      setValue(initialValue);
    } catch (error) {
      console.error('Error removing from storage:', error);
      throw error;
    }
  };

  return {
    value,
    loading,
    saveValue,
    removeValue,
    setValue,
  };
};
