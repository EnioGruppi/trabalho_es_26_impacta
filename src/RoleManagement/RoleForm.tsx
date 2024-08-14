import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import styles from "./styles";
import { rolesService } from '../services/role.service';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import MyInput from '../components/MyInput';

export default function AddRole() {
  const navigation = useNavigation<NavigationProp<any>>();

  const [roleName, setRoleName] = useState('');
  const [descricao, setDescricao] = useState('');

  function create() {
    if (!roleName || roleName.trim().length < 1) {
      Alert.alert('Por favor, coloque o nome.');
      return;
    }

    if (!descricao || descricao.trim().length < 1) {
      Alert.alert('Por favor, coloque a descrição.');
      return;
    }

    rolesService.create(roleName, descricao).then(result => {
      if (result) {
        setRoleName('');
        setDescricao('');
        navigation.goBack();
      } else {
        Alert.alert('Erro ao criar o papel.');
      }
    }).catch(error => {
      Alert.alert('Erro ao criar o papel.', error.message);
    });
  }

  return (
    <View style={styles.container}>
      <MyInput title='Nome' value={roleName} change={setRoleName} />
      <MyInput title='Descrição' value={descricao} change={setDescricao} />

      <View style={styles.buttonView}>
        <Button title='Salvar' onPress={create} />
      </View>
    </View>
  );
}
