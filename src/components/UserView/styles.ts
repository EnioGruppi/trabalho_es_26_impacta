import { StyleSheet } from 'react-native'

export default StyleSheet.create({

    container: {
        display: 'flex',
        paddingVertical: 10,
        borderBottomWidth: 1,
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderBottomColor: 'gray',
        justifyContent: 'space-between',
    },

    title: {
        fontSize: 14,
        fontWeight: '500'
    },

    subTitle: {
        fontSize: 12,
    },

    deleteContainer: {
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: 'red',
        justifyContent: 'center',
    },

    deleteText: {
        color: 'white',
        fontWeight: 'bold',
    },

})