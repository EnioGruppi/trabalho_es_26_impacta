import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, Button } from 'react-native';
import { Checkbox } from 'react-native-paper';

interface MultiSelectComponentProps {
    title: string;
    data: { label: string; value: number }[];
    value: number[];
    change: (selected: number[]) => void;
}

const MultiSelectComponent: React.FC<MultiSelectComponentProps> = ({ title, data, value, change }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedValues, setSelectedValues] = useState<number[]>(value);

    const toggleValue = (val: number) => {
        if (selectedValues.includes(val)) {
            setSelectedValues(selectedValues.filter(item => item !== val));
        } else {
            setSelectedValues([...selectedValues, val]);
        }
    };

    const saveSelection = () => {
        change(selectedValues);
        setModalVisible(false);
    };

    return (
        <View>
            <TouchableOpacity style={styles.selector} onPress={() => setModalVisible(true)}>
                <Text style={styles.selectorText}>{title}: {selectedValues.length} selecionado(s)</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Selecione {title}</Text>
                        <FlatList
                            data={data}
                            keyExtractor={item => item.value.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.item}>
                                    <Checkbox
                                        status={selectedValues.includes(item.value) ? 'checked' : 'unchecked'}
                                        onPress={() => toggleValue(item.value)}
                                    />
                                    <Text>{item.label}</Text>
                                </View>
                            )}
                        />
                        <View style={styles.modalButtons}>
                            <Button title="Salvar" onPress={saveSelection} />
                            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    selector: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 15
    },
    selectorText: {
        color: '#000'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    }
});

export default MultiSelectComponent;
