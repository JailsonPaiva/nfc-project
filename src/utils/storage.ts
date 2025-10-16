// Utilitários de armazenamento local
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../config/constants';

export const storage = {
  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error storing data:', error);
      throw error;
    }
  },

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data:', error);
      throw error;
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  },
};

// Helpers específicos para a aplicação
export const userStorage = {
  async saveUserData(userData: any): Promise<void> {
    return storage.setItem(STORAGE_KEYS.USER_DATA, userData);
  },

  async getUserData(): Promise<any> {
    return storage.getItem(STORAGE_KEYS.USER_DATA);
  },

  async saveToken(token: string): Promise<void> {
    return storage.setItem(STORAGE_KEYS.USER_TOKEN, token);
  },

  async getToken(): Promise<string | null> {
    return storage.getItem(STORAGE_KEYS.USER_TOKEN);
  },

  async clearUserData(): Promise<void> {
    await Promise.all([
      storage.removeItem(STORAGE_KEYS.USER_DATA),
      storage.removeItem(STORAGE_KEYS.USER_TOKEN),
    ]);
  },
};
