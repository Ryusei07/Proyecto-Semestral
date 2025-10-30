// Servicio API para conexión con backend (para usar más adelante)
const API_BASE_URL = 'http://localhost:8080/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    console.log(`🔄 Intentando conectar a: ${url}`);
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }
      
      // Para respuestas sin contenido (como DELETE exitoso)
      if (response.status === 204) {
        return { success: true, message: 'Operación exitosa' };
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('❌ Error de conexión:', error.message);
      throw new Error(`No se pudo conectar con el servidor: ${error.message}`);
    }
  }

  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: data,
    });
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: data,
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

export default new ApiService();