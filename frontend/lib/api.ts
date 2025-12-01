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
    // Temporarily disable 401 redirect for development
    // if (error.response?.status === 401) {
    //   if (typeof window !== 'undefined') {
    //     localStorage.removeItem('token');
    //     window.location.href = '/login';
    //   }
    // }
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

// Admin API Functions (using public endpoints for now)
export const adminProductApi = {
  getAll: (params?: any) => apiClient.get('/Products', { params }),
  getById: (id: string) => apiClient.get(`/Products/${id}`),
  create: (data: any) => apiClient.post('/Products', data),
  update: (id: string, data: any) => apiClient.put(`/Products/${id}`, data),
  delete: (id: string) => apiClient.delete(`/Products/${id}`),
  toggleActive: (id: string) => apiClient.patch(`/Products/${id}/toggle-active`),
};

export const adminCategoryApi = {
  getAll: () => apiClient.get('/admin/AdminCategories'),
  getById: (id: string) => apiClient.get(`/admin/AdminCategories/${id}`),
  create: (data: any) => apiClient.post('/admin/AdminCategories', data),
  update: (id: string, data: any) => apiClient.put(`/admin/AdminCategories/${id}`, data),
  delete: (id: string) => apiClient.delete(`/admin/AdminCategories/${id}`),
};

export const adminBrandApi = {
  getAll: () => apiClient.get('/admin/AdminBrands'),
  getById: (id: string) => apiClient.get(`/admin/AdminBrands/${id}`),
  create: (data: any) => apiClient.post('/admin/AdminBrands', data),
  update: (id: string, data: any) => apiClient.put(`/admin/AdminBrands/${id}`, data),
  delete: (id: string) => apiClient.delete(`/admin/AdminBrands/${id}`),
};

export const adminOrderApi = {
  getAll: (params?: any) => apiClient.get('/Orders', { params }),
  getById: (id: string) => apiClient.get(`/Orders/${id}`),
  updateStatus: (id: string, status: string) => apiClient.patch(`/Orders/${id}/status`, { status }),
};

export const adminUserApi = {
  getAll: () => apiClient.get('/Users'),
  getById: (id: string) => apiClient.get(`/Users/${id}`),
  toggleActive: (id: string) => apiClient.post(`/Users/${id}/toggle-active`),
  addRole: (id: string, roleName: string) => apiClient.post(`/Users/${id}/roles`, { roleName }),
  removeRole: (id: string, roleName: string) => apiClient.delete(`/Users/${id}/roles/${roleName}`),
};

export const adminDashboardApi = {
  getOverview: () => apiClient.get('/Dashboard/overview'),
  getRecentOrders: (limit: number = 5) => apiClient.get(`/Dashboard/recent-orders?limit=${limit}`),
};

export const storeSettingsApi = {
  get: () => apiClient.get('/StoreSettings'),
  update: (data: any) => apiClient.put('/StoreSettings', data),
  updateGeneral: (data: any) => apiClient.put('/StoreSettings/general', data),
  updateHeroSlides: (slides: any[]) => apiClient.put('/StoreSettings/hero-slides', slides),
  updateSections: (sections: any[]) => apiClient.put('/StoreSettings/sections', sections),
};
