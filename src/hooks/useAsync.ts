// Hook personalizado para operações assíncronas
import { useState, useCallback } from 'react';
import { LoadingState } from '../types';

interface UseAsyncState<T> {
  data: T | null;
  loading: LoadingState;
  error: string | null;
}

export const useAsync = <T>() => {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    loading: 'idle',
    error: null,
  });

  const execute = useCallback(async (asyncFunction: () => Promise<T>) => {
    setState(prev => ({ ...prev, loading: 'loading', error: null }));

    try {
      const result = await asyncFunction();
      setState({
        data: result,
        loading: 'success',
        error: null,
      });
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setState({
        data: null,
        loading: 'error',
        error: errorMessage,
      });
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: 'idle',
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
};
