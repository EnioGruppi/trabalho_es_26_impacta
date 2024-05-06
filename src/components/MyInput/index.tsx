import { View, Text, TextInput } from 'react-native'

import styles from './styles'

type Props = {
    title: string,
    value: string,
    change: (value: string) => void,
    isPassword?: boolean,
    disabled?: boolean,
}

export default function MyInput(props: Props) {
    return (
        <View>
            <Text style={styles.label}>{props.title}:</Text>
            <TextInput
                style={styles.input}
                value={props.value}
                onChangeText={props.change}
                secureTextEntry={props.isPassword}
                readOnly={props.disabled}
            />
        </View>
    )
}