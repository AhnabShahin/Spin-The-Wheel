/**
 * API Utilities for Spin The Wheel Plugin
 */

class ApiClient {
    constructor() {
        this.baseUrl = window.stwAdminData?.rest_url || window.stwData?.rest_url || '';
        this.namespace = 'stw/v1';
        this.nonce = window.stwAdminData?.rest_nonce || window.stwData?.rest_nonce || '';
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            'X-WP-Nonce': this.nonce
        };
    }

    /**
     * Make HTTP request
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${this.namespace}/${endpoint.replace(/^\//, '')}`;
        
        const config = {
            headers: { ...this.defaultHeaders, ...options.headers },
            ...options
        };

        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Network error' }));
                throw new ApiError(errorData.message || 'Request failed', response.status, errorData);
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            
            return await response.text();
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError('Network error occurred', 0, error);
        }
    }

    /**
     * GET request
     */
    async get(endpoint, params = {}) {
        const searchParams = new URLSearchParams(params);
        const url = searchParams.toString() ? `${endpoint}?${searchParams}` : endpoint;
        
        return this.request(url, { method: 'GET' });
    }

    /**
     * POST request
     */
    async post(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    /**
     * PUT request
     */
    async put(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    /**
     * PATCH request
     */
    async patch(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(data)
        });
    }

    /**
     * DELETE request
     */
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }

    /**
     * Upload file
     */
    async upload(endpoint, file, additionalData = {}) {
        const formData = new FormData();
        formData.append('file', file);
        
        Object.keys(additionalData).forEach(key => {
            formData.append(key, additionalData[key]);
        });

        return this.request(endpoint, {
            method: 'POST',
            headers: { 'X-WP-Nonce': this.nonce }, // Don't set Content-Type for FormData
            body: formData
        });
    }
}

/**
 * Custom API Error class
 */
class ApiError extends Error {
    constructor(message, status = 0, data = null) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }

    isNetworkError() {
        return this.status === 0;
    }

    isClientError() {
        return this.status >= 400 && this.status < 500;
    }

    isServerError() {
        return this.status >= 500;
    }
}

/**
 * Theme API methods
 */
class ThemeApi {
    constructor(client) {
        this.client = client;
    }

    async getThemes() {
        return this.client.get('template');
    }

    async getTheme(id) {
        return this.client.get(`template/${id}`);
    }

    async createTheme(data) {
        return this.client.post('template', data);
    }

    async updateTheme(id, data) {
        return this.client.put(`template/${id}`, data);
    }

    async deleteTheme(id) {
        return this.client.delete(`template/${id}`);
    }

    async duplicateTheme(id) {
        return this.client.post(`template/${id}/duplicate`);
    }
}

/**
 * Data API methods
 */
class DataApi {
    constructor(client) {
        this.client = client;
    }

    async getWheelData(id) {
        return this.client.get(`data/${id}`);
    }

    async updateWheelData(id, data) {
        return this.client.put(`data/${id}`, data);
    }

    async getAnalytics(params = {}) {
        return this.client.get('analytics', params);
    }

    async saveSpinResult(data) {
        return this.client.post('analytics/spin', data);
    }
}

/**
 * Settings API methods
 */
class SettingsApi {
    constructor(client) {
        this.client = client;
    }

    async getSettings() {
        return this.client.get('settings');
    }

    async updateSettings(data) {
        return this.client.put('settings', data);
    }

    async getSetting(key) {
        return this.client.get(`settings/${key}`);
    }

    async updateSetting(key, value) {
        return this.client.put(`settings/${key}`, { value });
    }
}

// Create singleton instance
const apiClient = new ApiClient();

// Export API instances
export const api = {
    client: apiClient,
    themes: new ThemeApi(apiClient),
    data: new DataApi(apiClient),
    settings: new SettingsApi(apiClient)
};

export { ApiError };

// Default export
export default api;
