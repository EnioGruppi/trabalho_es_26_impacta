import { authRepository } from "./auth.repository"

class AuthService {

    private readonly baseUrl = 'http://10.0.2.2:3030/auth'

    public async login(username: string, password: string) {
        const response = await fetch(`${this.baseUrl}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password })
        })

        if (response.ok) {
            const user = await response.json()
            if (user && user.token) {
                await authRepository.setLoggedUser(user)
                return true
            }
        }
        return false
    }
}

export const authService = new AuthService()