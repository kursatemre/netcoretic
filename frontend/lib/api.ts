import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Token varsa ekle
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Public API Functions
export const productApi = {
  getAll: (params?: any) => apiClient.get('/Products', { params }),
  getById: (id: string) => apiClient.get(`/Products/${id}`),
  search: (query: string) => apiClient.get(`/Products/search?query=${encodeURIComponent(query)}`),
};

export const categoryApi = {
  getAll: () => apiClient.get('/Categories'),
  getById: (id: string) => apiClient.get(`/Categories/${id}`),
};

export const brandApi = {
  getAll: () => apiClient.get('/Brands'),
  getById: (id: string) => apiClient.get(`/Brands/${id}`),
};

export const orderApi = {
  getAll: () => apiClient.get('/Orders'),
  getById: (id: string) => apiClient.get(`/Orders/${id}`),
  create: (data: any) => apiClient.post('/Orders', data),
};

// Admin API Functions
export const adminProductApi = {
  getAll: (params?: any) => apiClient.get('/admin/adminproducts', { params }),
  getById: (id: string) => apiClient.get(`/admin/adminproducts/${id}`),
  create: (data: any) => apiClient.post('/admin/adminproducts', data),
  update: (id: string, data: any) => apiClient.put(`/admin/adminproducts/${id}`, data),
  delete: (id: string) => apiClient.delete(`/admin/adminproducts/${id}`),
  toggleActive: (id: string) => apiClient.patch(`/admin/adminproducts/${id}/toggle-active`),
};

export const adminCategoryApi = {
  getAll: () => apiClient.get('/admin/admincategories'),
  getById: (id: string) => apiClient.get(`/admin/admincategories/${id}`),
  create: (data: any) => apiClient.post('/admin/admincategories', data),
  update: (id: string, data: any) => apiClient.put(`/admin/admincategories/${id}`, data),
  delete: (id: string) => apiClient.delete(`/admin/admincategories/${id}`),
};

export const adminBrandApi = {
  getAll: () => apiClient.get('/admin/adminbrands'),
  getById: (id: string) => apiClient.get(`/admin/adminbrands/${id}`),
  create: (data: any) => apiClient.post('/admin/adminbrands', data),
  update: (id: string, data: any) => apiClient.put(`/admin/adminbrands/${id}`, data),
  delete: (id: string) => apiClient.delete(`/admin/adminbrands/${id}`),
};

export const adminOrderApi = {
  getAll: (params?: any) => apiClient.get('/admin/adminorders', { params }),
  getById: (id: string) => apiClient.get(`/admin/adminorders/${id}`),
  updateStatus: (id: string, status: string) => apiClient.patch(`/admin/adminorders/${id}/status`, { status }),
};

export const adminUserApi = {
  getAll: () => apiClient.get('/admin/adminusers'),
  getById: (id: string) => apiClient.get(`/admin/adminusers/${id}`),
  toggleActive: (id: string) => apiClient.post(`/admin/adminusers/${id}/toggle-active`),
  addRole: (id: string, roleName: string) => apiClient.post(`/admin/adminusers/${id}/roles`, { roleName }),
  removeRole: (id: string, roleName: string) => apiClient.delete(`/admin/adminusers/${id}/roles/${roleName}`),
};

export const adminDashboardApi = {
  getOverview: () => apiClient.get('/admin/dashboard/overview'),
  getRecentOrders: (limit: number = 5) => apiClient.get(`/admin/dashboard/recent-orders?limit=${limit}`),
};
