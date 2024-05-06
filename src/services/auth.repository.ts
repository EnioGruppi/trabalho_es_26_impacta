import AsyncStorage from '@react-native-async-storage/async-storage'

class AuthRepository {

    private readonly key = '@auth/logged_user'

    public async getLoggedUser() {
        const json = await AsyncStorage.getItem(this.key)
        return json ? JSON.parse(json) : null
    }

    public async setLoggedUser(user: any) {
        if (user) {
            await AsyncStorage.setItem(this.key, JSON.stringify(user))
        }
    }

    public async removeLoggedUser() {
        await AsyncStorage.removeItem(this.key)
    }

}

export const authRepository = new AuthRepository()