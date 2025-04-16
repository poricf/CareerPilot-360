import { useState, useEffect } from 'react';
import { coursesApi } from '@/lib/api';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  createdAt: string;
  updatedAt: string;
}

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const { data, error } = await coursesApi.getAll();
      
      if (error) {
        setError(error);
      } else if (data) {
        setCourses(data);
      }
    } catch (err) {
      setError('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const createCourse = async (
    course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>,
    token: string
  ) => {
    try {
      setLoading(true);
      const { data, error } = await coursesApi.create(course, token);
      
      if (error) {
        setError(error);
        return false;
      }
      
      if (data) {
        setCourses(prev => [...prev, data]);
        return true;
      }
      
      return false;
    } catch (err) {
      setError('Failed to create course');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    courses,
    loading,
    error,
    createCourse,
    refresh: fetchCourses,
  };
} 