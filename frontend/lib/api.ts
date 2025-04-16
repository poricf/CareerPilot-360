const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error || 'Something went wrong' };
    }

    return { data };
  } catch (error) {
    return { error: 'Network error' };
  }
}

// Auth API
export const authApi = {
  register: async (email: string, password: string, name: string) => {
    return fetchApi('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  },

  login: async (email: string, password: string) => {
    return fetchApi('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
};

// Courses API
export const coursesApi = {
  getAll: async () => {
    return fetchApi('/api/courses');
  },

  getById: async (id: string) => {
    return fetchApi(`/api/courses/${id}`);
  },

  create: async (course: {
    title: string;
    description: string;
    duration: string;
    level: string;
  }, token: string) => {
    return fetchApi('/api/courses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(course),
    });
  },
};

// Careers API
export const careersApi = {
  getAll: async () => {
    return fetchApi('/api/careers');
  },

  getById: async (id: string) => {
    return fetchApi(`/api/careers/${id}`);
  },

  create: async (career: {
    title: string;
    description: string;
    salary: string;
    requirements: string[];
  }, token: string) => {
    return fetchApi('/api/careers', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(career),
    });
  },
}; 