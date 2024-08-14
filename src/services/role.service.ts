
import axios from "axios";
import { authRepository } from "./auth.repository";

class RolesService {

    private readonly baseUrl = 'http://10.0.2.2:3030/roles';

    public async getHeaders() {
        const logged = await authRepository.getLoggedUser();
        if (!logged) return null;

        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${logged.token}`
        };
    }

    public async get() {
        const headers = await this.getHeaders();
        if (!headers) throw new Error('Falha ao obter cabeçalhos.');
    
        try {
          const response = await axios.get(this.baseUrl, { headers });
          if (response.status.toString().startsWith("2")) {
            return response.data; 
          } else {
            throw new Error('Falha ao buscar papéis.');
          }
        } catch (error) {
          console.error('Erro ao buscar papéis:', error);
          throw error; 
        }
      }
    
    
   
    public async create(nome: string, descricao: string) {
        const headers = await this.getHeaders();
        if (!headers) throw new Error('Falha no cabeçalho');
    
        const response = await axios.post(
          this.baseUrl,
          { description: descricao, name: nome },
          { headers }
        );
        return response.data;
      }
    }
  
export const rolesService = new RolesService()