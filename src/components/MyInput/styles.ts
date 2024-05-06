import { Dimensions, StyleSheet } from 'react-native'

export default StyleSheet.create({

    label: {
        fontSize: 18,
    },

    input: {
        padding: 5,
        fontSize: 16,
        borderWidth: 1,
        marginBottom: 10,
        width: Dimensions.get('screen').width - 80,
    },

})