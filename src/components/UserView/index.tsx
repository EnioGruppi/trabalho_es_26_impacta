import { Text, View } from "react-native"
import { BorderlessButton, GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler'

import styles from './styles'

type Props = {
    user: any,
    edit: (id: number) => void,
    remove: (id: number) => void,
}

type DeleteProps = {
    remove: () => void,
}

function DeleteButton({ remove }: DeleteProps) {
    return (
        <View style={styles.deleteContainer}>
            <BorderlessButton onPress={() => remove()}>
                <Text style={styles.deleteText}>DELETE</Text>
            </BorderlessButton>
        </View>
    )
}

export default function UserView({ user, edit, remove }: Props) {
    return (
        <GestureHandlerRootView>
            <Swipeable renderRightActions={() => <DeleteButton remove={() => remove(user.id)} />}>
                <View style={styles.container} onTouchEnd={() => edit(user.id)}>
                    <Text style={styles.title}>{user.name}</Text>
                    <Text style={styles.subTitle}>{user.username}</Text>
                </View>
            </Swipeable>
        </GestureHandlerRootView>
    )
}