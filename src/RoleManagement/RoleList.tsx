import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { rolesService } from '../services/role.service';
import { NavigationProp, useNavigation } from '@react-navigation/native';

interface Role {
  id: number;
  name: string;
  description: string;
}
  export default function RoleList() {
  const navigation = useNavigation<NavigationProp<any>>();

  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    rolesService.get()
      .then(result => {
        if (result) {
          setRoles(result);
        } else {
          Alert.alert('Nenhum papel encontrado.');
        }
      })
      .catch(error => {
        Alert.alert('Erro ao carregar os papéis.', error.message);
      });
  }, []); 

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      alignItems: 'center',
      backgroundColor: '#f8f8f8',
      justifyContent: 'flex-start',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    roleItemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      width: '100%',
    },
    roleItem: {
      fontSize: 18,
    },
    buttonView: {
      marginTop: 20,
      width: '100%',
    },
  });
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Roles</Text>
      <FlatList
        data={roles}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.roleItemContainer}>
            <Text style={styles.roleItem}>{item.name}</Text>
            <Text style={styles.roleItem}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
  
  
}


