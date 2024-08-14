import React, { useEffect, useState } from 'react';
import { Button, View, Alert } from 'react-native';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import MyInput from '../../components/MyInput';
import MultiSelectComponent from '../../components/MultiSelectComponent';
import styles from './styles';
import { userService } from '../../services/user.service';
import { rolesService } from '../../services/role.service';

export default function UserPage() {
    const navigation = useNavigation<NavigationProp<any>>();
    const route = useRoute();

    const id: number = route.params ? (route.params as any).id : 0;

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [roles, setRoles] = useState<number[]>([]);
    const [confirmPass, setConfirmPass] = useState('');
    const [availableRoles, setAvailableRoles] = useState<{ label: string; value: number }[]>([]);

    useEffect(() => {
        fetchUser();
        loadRoles();

        if (id === 0) {
            navigation.setOptions({ title: 'Novo Usuário' });
        } else {
            navigation.setOptions({ title: 'Editar Usuário' });
        }
    }, [id]);

    async function fetchUser() {
        if (id > 0) {
            const user = await userService.getById(id);
            console.log('Fetched User:', user);
            setName(user.name);
            setUsername(user.username);
            setRoles(user.roles.map((role: any) => role.id));
        }
    }

    async function loadRoles() {
        try {
            const list = await rolesService.get();
            const formattedRoles = list.map((role: { id: number; name: string }) => ({
                label: role.name,
                value: role.id,
            }));
            console.log('Available Roles:', formattedRoles);
            setAvailableRoles(formattedRoles);
        } catch (error) {
            console.error('Erro ao carregar papéis:', error);
        }
    }

    function create() {
        if (!name.trim()) {
            Alert.alert('Nome é obrigatório');
            return;
        }
        if (!username.trim()) {
            Alert.alert('Login é obrigatório');
            return;
        }
        if (!password.trim()) {
            Alert.alert('Senha é obrigatória');
            return;
        }
        if (password !== confirmPass) {
            Alert.alert('Senha não confere');
            return;
        }

        userService.create(name, username, password, roles).then(result => {
            if (result) {
                setName('');
                setUsername('');
                setPassword('');
                setConfirmPass('');
                setRoles([]);
                navigation.goBack();
            } else {
                Alert.alert('Erro ao criar usuário');
            }
        }).catch(error => console.error(error));
    }

    function update() {
        if (!name.trim()) {
            Alert.alert('Nome é obrigatório');
            return;
        }

        userService.update(id, name, roles).then(result => {
            if (result) {
                setName('');
                setUsername('');
                setRoles([]);
                navigation.goBack();
            } else {
                Alert.alert('Erro ao atualizar usuário');
            }
        }).catch(error => console.error(error));
    }

    function save() {
        if (id > 0) {
            update();
        } else {
            create();
        }
    }

    return (
        <View style={styles.container}>
            <MyInput title='Nome' value={name} change={setName} />
            <MyInput title='Login' value={username} change={setUsername} disabled={id > 0} />
            <MultiSelectComponent
                title='Role'
                data={availableRoles}
                value={roles}
                change={setRoles}
            />
            {id === 0 && (
                <>
                    <MyInput title='Senha' value={password} change={setPassword} isPassword />
                    <MyInput title='Confirmar Senha' value={confirmPass} change={setConfirmPass} isPassword />
                </>
            )}
            <View style={styles.buttonView}>
                <Button title='Salvar' onPress={save} />
            </View>
        </View>
    );
}
