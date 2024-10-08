import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginPage from './src/pages/Login'
import HomePage from './src/pages/Home'
import UserPage from './src/pages/User'
import RoleForm from './src/RoleManagement/RoleForm'
import RoleList from './src/RoleManagement/RoleList'


const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginPage} options={{ title: 'Página de Acesso' }} />
                <Stack.Screen name="Home" component={HomePage} />
                <Stack.Screen name="User" component={UserPage} />
                <Stack.Screen name="RoleList" component={RoleList} options={{ title: 'Role List' }} />
                <Stack.Screen name="RoleForm" component={RoleForm} options={{ title: 'Create Role' }} />
            </Stack.Navigator>
            
        </NavigationContainer>
    )}