import { authRepository } from "./auth.repository"

class UserService {

    private readonly baseUrl = 'http://192.168.0.9:3030/users'

    private async getHeaders() {
        const logged = await authRepository.getLoggedUser()
        if (!logged) return null

        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${logged.token}`
        }
    }

    public async get() {
        const headers = await this.getHeaders()
        if (headers) {
            const response = await fetch(this.baseUrl, {
                method: 'GET',
                headers,
            })

            if (response.status === 401) return null
            if (response.ok) {
                return (await response.json()) as any[]
            }
        }
        return null
    }

    public async getById(id: number) {
        const headers = await this.getHeaders()
        if (headers) {
            const response = await fetch(`${this.baseUrl}/${id}`, {
                method: 'GET',
                headers,
            })

            if (response.status === 401) return null
            if (response.ok) {
                return await response.json()
            }
        }
        return null
    }

    public async create(name: string, username: string, password: string) {
        const headers = await this.getHeaders()
        if (headers) {
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify({ name, username, password })
            })

            if (response.status === 400) return 'Usuário já existe'
            if (response.status === 401) return null
            return response.ok
        }
        return null
    }

    public async update(id: number, name: string) {
        const headers = await this.getHeaders()
        if (headers) {
            const response = await fetch(`${this.baseUrl}/${id}`, {
                method: 'PUT',
                headers,
                body: JSON.stringify({ name })
            })

            if (response.status === 401) return null
            return response.ok
        }
        return null
    }

    public async remove(id: number) {
        const headers = await this.getHeaders()
        if (headers) {
            const response = await fetch(`${this.baseUrl}/${id}`, {
                method: 'DELETE',
                headers,
            })
    
            if (response.status === 401) return null
            return response.ok
        }
        return null
    }
}

export const userService = new UserService()