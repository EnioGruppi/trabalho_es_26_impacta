import React from 'react'
import { Alert, Button, FlatList, Text, View } from "react-native"
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { userService } from '../../services/user.service'
import UserView from '../../components/UserView'

export default function HomePage() {

    const navigation = useNavigation<NavigationProp<any>>()

    const [refreshing, setRefreshing] = React.useState(false)
    const [users, setUsers] = React.useState<any[]>([])

    React.useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <Button title="Sair" onPress={logOut} />,
            headerRight: () => (
                <>
                    <Button title="Add" onPress={goToUser} />
                </>
            )
        })

        fetchUser()
    }, [])

    function logOut() {
        navigation.goBack()
    }

    function goToUser() {
        navigation.navigate('User')
    }

    async function fetchUser() {
        setRefreshing(true)
        try {
            const list = await userService.get()
            if (list) setUsers(list)
            else logOut()
        } catch (error) {
            console.error(error)
        }
        setRefreshing(false)
    }

    function editUser(id: number) {
        navigation.navigate('User', { id })
    }

    function removeUser(id: number) {
        userService.remove(id).then(isDeleted => {
            if (isDeleted) fetchUser()
        })
    }

    return (
        <View>
            <FlatList
                data={users}
                refreshing={refreshing}
                onRefresh={fetchUser}
                renderItem={({ item }) =>
                    <UserView user={item} edit={editUser} remove={removeUser} />
                }
            />
        </View>
    )
}