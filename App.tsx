import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginPage from './src/pages/Login'
import HomePage from './src/pages/Home'
import UserPage from './src/pages/User'
import EditUser  from './src/components/RoleManagement/EditUser';
import  ListRoles from './src/components/RoleManagement/ListRoles';
import NewRoleForm  from './src/components/RoleManagement/NewRoleForm';

const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginPage} options={{ title: 'Página de Acesso' }} />
                <Stack.Screen name="Home" component={HomePage} />
                <Stack.Screen name="User" component={UserPage} />
                <Stack.Screen name="Roles" component={EditUser} />
                <Stack.Screen name="ListRoles" component={ListRoles} />
                <Stack.Screen name="NewRoleForm" component={NewRoleForm} />
            </Stack.Navigator>
        </NavigationContainer>
    )}