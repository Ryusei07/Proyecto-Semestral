// Servicio para gestión de usuarios
const API_BASE_URL = 'http://localhost:8080/api';

class UserService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    console.log(`🔄 Haciendo petición ${options.method || 'GET'} a: ${url}`);
    
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      };

      const response = await fetch(url, config);
      
      console.log(`✅ Respuesta recibida: ${response.status}`);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }
      
      if (response.status === 204) {
        return { success: true, message: 'Operación exitosa' };
      }
      
      return await response.json();
    } catch (error) {
      console.error('❌ Error de conexión:', error.message);
      throw error;
    }
  }

  // Obtener todos los usuarios
  async getAllUsers() {
    try {
      console.log('🔄 Obteniendo usuarios del backend...');
      const users = await this.request('/usuarios');
      console.log(`✅ ${users.length} usuarios obtenidos de la base de datos`);
      return users;
    } catch (error) {
      console.log('🚫 No se pudo conectar con el backend, usando datos de demostración...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      return this.getDemoUsers();
    }
  }

  // Crear usuario
  async createUser(userData) {
    return await this.request('/usuarios', {
      method: 'POST',
      body: userData,
    });
  }

  // Actualizar usuario
  async updateUser(id, userData) {
    return await this.request(`/usuarios/${id}`, {
      method: 'PUT',
      body: userData,
    });
  }

  // Eliminar usuario
  async deleteUser(id) {
    return await this.request(`/usuarios/${id}`, {
      method: 'DELETE',
    });
  }

  // Datos de demostración
  getDemoUsers() {
    return [
      {
        id: 1,
        nombre: "Ana Kobayashi",
        email: "ana.kobayashi@duocuc.cl",
        rol: "ADMIN",
        fechaRegistro: "2024-01-15",
        activo: true,
        ultimoAcceso: "2024-10-30"
      },
      {
        id: 2,
        nombre: "Carlos Rodríguez",
        email: "carlos.rodriguez@duocuc.cl", 
        rol: "USER",
        fechaRegistro: "2024-02-20",
        activo: true,
        ultimoAcceso: "2024-10-29"
      },
      {
        id: 3,
        nombre: "María González",
        email: "maria.gonzalez@duocuc.cl",
        rol: "USER",
        fechaRegistro: "2024-03-10",
        activo: false,
        ultimoAcceso: "2024-09-15"
      },
      {
        id: 4,
        nombre: "Pedro Martínez",
        email: "pedro.martinez@duocuc.cl",
        rol: "USER",
        fechaRegistro: "2024-04-05",
        activo: true,
        ultimoAcceso: "2024-10-30"
      }
    ];
  }
}

export default new UserService();