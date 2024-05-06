import React from 'react'
import { Button, View, Text, Alert } from 'react-native'
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native'

import MyInput from '../../components/MyInput'

import styles from './styles'
import { userService } from '../../services/user.service'

export default function UserPage() {

    const navigation = useNavigation<NavigationProp<any>>()
    const route = useRoute()

    const id: number = route.params ? (route.params as any).id : 0

    const [name, setName] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPass, setConfirmPass] = React.useState('')

    function fetchUser() {
        if (id > 0) {
            userService.getById(id).then(user => {
                setName(user.name)
                setUsername(user.username)
            })
        }
    }

    React.useEffect(() => {
        fetchUser()

        if (id === 0) {
            navigation.setOptions({ title: 'Novo Usuário' })
        } else {
            navigation.setOptions({ title: 'Editar Usuário' })
        }
    }, [id])

    function create() {
        if (!name || name.trim().length < 1) {
            Alert.alert('Nome é obrigatório')
            return
        }
        if (!username || username.trim().length < 1) {
            Alert.alert('Login é obrigatório')
            return
        }
        if (!password || password.trim().length < 1) {
            Alert.alert('Senha é obrigatória')
            return
        }
        if (password !== confirmPass) {
            Alert.alert('Senha não confere')
            return
        }
        
        userService.create(name, username, password).then(result => {
            if (result === true) {
                setName('')
                setUsername('')
                setPassword('')
                setConfirmPass('')
                navigation.goBack()
            } else {
                Alert.alert(result+'')
            }
        }).catch(error => console.error(error))
    }

    function update() {
        if (!name || name.trim().length < 1) {
            Alert.alert('Nome é obrigatório')
            return
        }
        
        userService.update(id, name).then(result => {
            if (result === true) {
                setName('')
                setUsername('')
                navigation.goBack()
            } else {
                Alert.alert(result+'')
            }
        }).catch(error => console.error(error))
    }

    function save() {
        if (id > 0) update()
        else create()
    }

    return (
        <View style={styles.container}>
            <MyInput title='Nome' value={name} change={setName} />
            <MyInput title='Login' value={username} change={setUsername} disabled={id > 0} />
            {(id === 0) && (
                <>
                    <MyInput title='Senha' value={password} change={setPassword} isPassword />
                    <MyInput title='Confirmar Senha' value={confirmPass} change={setConfirmPass} isPassword />
                </>
            )}

            <View style={styles.buttonView}>
                <Button title='Salvar' onPress={save} />
            </View>

        </View>
    )
}