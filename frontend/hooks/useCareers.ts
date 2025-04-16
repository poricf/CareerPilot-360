import { useState, useEffect } from 'react';
import { careersApi } from '@/lib/api';

interface Career {
  id: string;
  title: string;
  description: string;
  salary: string;
  requirements: string[];
  createdAt: string;
  updatedAt: string;
}

export function useCareers() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      setLoading(true);
      const { data, error } = await careersApi.getAll();
      
      if (error) {
        setError(error);
      } else if (data) {
        setCareers(data);
      }
    } catch (err) {
      setError('Failed to fetch careers');
    } finally {
      setLoading(false);
    }
  };

  const createCareer = async (
    career: Omit<Career, 'id' | 'createdAt' | 'updatedAt'>,
    token: string
  ) => {
    try {
      setLoading(true);
      const { data, error } = await careersApi.create(career, token);
      
      if (error) {
        setError(error);
        return false;
      }
      
      if (data) {
        setCareers(prev => [...prev, data]);
        return true;
      }
      
      return false;
    } catch (err) {
      setError('Failed to create career');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    careers,
    loading,
    error,
    createCareer,
    refresh: fetchCareers,
  };
} 