import React from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Button, View, Alert } from 'react-native'

import { authService } from '../../services/auth.service'
import MyInput from '../../components/MyInput'
import styles from './styles'

export default function LoginPage() {

    const navigation = useNavigation<NavigationProp<any>>()

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    function signIn() {
        authService.login(username, password).then(isLogged => {
            if (isLogged) {
                navigation.navigate('Home')
            } else {
                Alert.alert('Login/senha inválido(a) 1')
            }
        }).catch(error => {
            Alert.alert('Login/senha inválido(a) 2')
        })
    }

    return (
        <View style={styles.container}>
            <MyInput title='Login' value={username} change={setUsername} />
            <MyInput title='Senha' value={password} change={setPassword} isPassword />

            <View style={styles.buttonView}>
                <Button title='Entrar' onPress={signIn} />
            </View>
        </View>
    )
}

